$(function () {
    // var loadindex=layer.load(1,{
    //     shade:[0.5,'#333']
    // })
    $.ajax({
        url: '../php/list.php',
        dataType: 'json',
        success(res){
            var {data} = res
            var pageSize = 4
            new Page('page',{
                language: {
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页'
                },
                pageData: {
                    pageSize,
                    total: data.length
                },
                show: function(currentPage) {
                    var tmp = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    var html = '';
                    tmp.forEach(function(value){
                        html+=`
                            <div class="sp">
                                <div class="sp-img">
                                    <img src="${value.imgpath}" alt="...">
                                </div>
                                <h1>${value.name}</h1>
                                <p class="introduce">${value.introduce}/</p>
                                <h2><a href="detail.html?id=${value.id}">查看详情</a></h2>
                            </div>                           
                        `
                        //   html += `
                        //       <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        //           <div class="thumbnail">
                        //               <img src="${value.imgpath}" alt="...">
                        //               <div class="caption">
                        //                   <h3>${value.name}</h3>
                        //                   <p class="introduce">${value.introduce}/</p>
                        //                   <p>
                        //                       <a href="detail.html?id=${value.id}" class="btn btn-default" role="button">查看详情</a>
                        //                   </p>
                        //               </div>
                        //           </div>
                        //       </div>
                        //   `
                    })
                    $('.scenics').html(html)
                }
            })
            // layer.close(loadindex)
        }
    })
})
$('.loginin').on('click',function(){
    $('.lg').css('display','block')
    return false
})
$('.close').on('click',function(){
    $('.lg').css('display','none')
    return false
})
$('.zhuce-btn').on('click',function(){
    location.href='./register.html'
})
$('.user-clear').on('click',function(){
    $("[name=username]").val('')
    return false
})
var rememberusername=getCookie('remembername')
var user=document.querySelector("[name=username]")
if(rememberusername){
    user.value=rememberusername
}
$('.loginForm').validate({
    rules:{
        username:'required',
        password:'required'
    },
    messages:{
        username:'<p class="msg1">账号不能为空</p>',
        password:'<p class="msg2">密码不能为空</p>'
    },
    submitHandler:function(form){
        var loadindex = layer.load(1, {
            shade: [0.5,'#333'] //0.1透明度的白色背景
        });
        $('.denglu-btn').prop('disabled',true)
        $.ajax({
            url:'../php/login.php',
            data:$(form).serialize(),
            dataType:'json',
            method:'post',
            success:res=>{
                console.log(3);
                // 解构赋值
                var {meta:{status,msg}} = res;                
                layer.close(loadindex)
                var msgindex = layer.msg(msg)
                if(status===0){
                    // 设置cookie
                    console.log(1);
                    setCookie('username',$('[name="username"]').val())
                    if($("[name='remember']").prop('checked')){
                        setCookie('rememberusername',$('[name="username"]').val(),7*24*3600)
                    }
                    // 应该跳转
                    setTimeout(()=>{
                        // layer.close(msgindex)
                        $('.denglu-btn').prop('disabled',false)
                        // var url = localStorage.getItem('url')
                        // if(!url){
                        location.href = 'list.html';
                        // }else{
                            // localStorage.removeItem('url')
                            // location.href = url
                        // }
                        
                    },500)
                    
                }else{
                    $('.denglu-btn').prop('disabled',false)
                    return false;
                }
            }
        })
        return false;
    }
})
$('.car').on('click',function(){
    var username=getCookie('username')
    if(username){
        location.href='./car.html'
    }else{
        layer.msg('请先登录',{time:500},function(){
            $('.lg').css('display','block')
        })
    }
    return false
})