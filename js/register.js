var num = 0
setInterval(function(){
  num++;
  if(num%2==0){
    $('.left').css({
      backgroundImage:"url(../img/01-1.jpg)"
    })
  }else{
    $('.left').css({
      backgroundImage:"url(../img/01-4.jpg)"
    })
  }
},2000)
var btn=document.querySelector('.login-btn')
btn.addEventListener('click',submit)
function submit(){
  var username=document.querySelector("[name='username']").value
  if(username===''){
    layer.msg('账号必填')
    return false
  }
  var reg1=/^[a-zA-Z][a-zA-Z0-9]{2,7}$/
  if(!reg1.test(username)){
    layer.msg('账号为：字母开头，字母、数字组成，3~8位')
    return false
  }
  var password=document.querySelector("[name='password']").value
  if(password===''){
    layer.msg('密码必填')
    return false
  }
  var reg2=/^[a-zA-Z0-9]{6,12}$/
  if(!reg2.test(password)){
    layer.msg('密码：数字字母12位')
    return false
  }
  var password1=document.querySelector("[name='password1']").value
  if(password1!==password){
    layer.msg('两次密码不一致')
    return false
  }
  var email=document.querySelector("[name='email']").value
  if(email===''){
    layer.msg('邮箱必填')
    return false
  }
  var reg3=/(^[a-zA-Z]\w{3,11}@(126|163)\.com$)|(^1\d{4,11}@qq\.com$)/
  // var reg3=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if(!reg3.test(email)){
    layer.msg('请输入正确邮箱')
    return false
  }
  var agree=document.querySelector("[name='agree']")
  if(!agree.checked){
    layer.msg('请同意协议')
    return false
  }
  var index=layer.load(1,{
    shade:[0.5,'#666']
  })
  btn.disabled=true
  pAjax({
    url:'../php/register.php',
    data:{
      username,
      password,
      email
    },
    type:'post'
  }).then(res=>{
    layer.close(index)
    var {meta:{status,msg}}=res
    var msgIndex=layer.msg(msg)
    if(status===0){
      setInterval(() => {
        layer.close(msgIndex)
        location.href='./index.html'
      }, 1000);
    }else{
      btn.disabled=false
      return false
    }
  })
}