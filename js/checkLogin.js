// 判断用户是否登录--判断cookie中会否存在username的值
$(function(){
  var username = getCookie('username');
  var login = document.querySelector('.login');
  if(username){
    var str = `<li><a>欢迎您，<span>${username}</span>！</a></li>
    <li><a href="javascript:;" class="logout">退出</a></li>`;
    login.innerHTML = str;
    // 退出功能
    var logout = document.querySelector('.logout');
    logout.onclick = function(){
      layer.confirm('你确定要退出吗？',
      {
        btn:['确定','取消']
      },
      function(){
        // 删除cookie
        delCookie('username');
        login.innerHTML = `<li><a href="" class="loginin">您好，请登录</a></li>`;
        layer.msg('退出成功',{icon:1,time:500},function(){
            layer.msg('请重新登录',{icon:2,time:500},function(){
              $('.lg').css('display','block')
            })
        })
      },
      function(){
        layer.msg('已取消',{icon:1,time:500})
        return false;
      }
      )
    }
  }else{
    layer.msg('请登录',{time:500},function(){
      $('.lg').css('display','block')
    })
  }
})