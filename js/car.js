$('a').on('click',function(e){
    e.preventDefault()
})
$('button').on('click',function(e){
    e.preventDefault()
})
$('.loginin').on('click',function(){
    $('.lg').css('display','block')
})
$('.close').on('click',function(){
    $('.lg').css('display','none')
})
$('.zhuce-btn').on('click',function(){
    location.href='./register.html'
})

$('.pop-service').hover(function(){
    $(this).find('.pop-serlink').css('background','#000').find('.pop-serico').css('background','url(../img/spr-service.png) no-repeat -47px -2px').next().css('color','white')
},function(){
    $(this).find('.pop-serlink').css('background','#fff').find('.pop-serico').css('background','url(../img/spr-service.png) no-repeat -2px -2px').next().css('color','#626262')
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
                        location.href = 'index.html';
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

$('.ser-tuichu').on('click',function(){
    $('.service').css('display','none')
})
$('.pop-service').on('click',function(){
    $('.service').css('display','block')
})
$('.user-clear').on('click',function(){
    $("[name=username]").val('')
})
$('.car').on('click',function(){
    location.href='car.html'
})
xiaoji()
function xiaoji(){
    var zhi=$('.zhi').val()-0
    var danjia=$('.l3').find('span').html()-0
    var num=zhi*danjia
    $('.l5').find('span').html(num+'.00')
}
zongjia()
function zongjia(){
    var zhi=$('.zhi').val()-0
    var danjia=$('.l3').find('span').html()-0
    var num=zhi*danjia
    $('.jiesuan').find('span').eq(0).html(zhi)
    $('.jiesuan').find('span').eq(1).html(num)
}
$('.jia').on('click',function(){
    var zhi=$('.zhi').val()-0
    if(zhi===10){
        layer.msg('最多购买10件',{time:500})
        return false
    }
    $(this).prev().val(zhi+1)
    // $('.zhi').val(zhi+1)
    xiaoji()
    zongjia()
})
$('.jian').on('click',function(){
    var zhi=$('.zhi').val()-0
    if(zhi===1){
        return false
    }
    $(this).next().val(zhi-1)
    // $('.zhi').val(zhi-1)
    xiaoji()
    zongjia()
})
$('.zhi').on('change',function(){
    var zhi=$('.zhi').val()-0
    if(zhi>10){
        layer.msg('最多购买10件',{time:500})
        $(this).val('10')
    }
    xiaoji()
    zongjia()
})
$('.l6').find('a').on('click',function(){
    $(this).parent().parent().remove()
})
