<?php
header('content-type:text/html;charset=utf8');
$link = mysqli_connect('localhost','root','123456','sz2105');
// 接收数据
$username = $_POST['username'];
$password = $_POST['password'];
// 连接数据库
$res = mysqli_query($link,"select * from user where username='$username'");
$row = mysqli_fetch_assoc($res);
if($row){
    if($row['password']===$password){
        $arr = [
            "meta"=>[
                "status"=>0,
                "msg"=>"登陆成功"
            ]
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>1,
                "msg"=>"账号或密码错误"
            ]
        ];
    }
}else{
    $arr = [
        "meta"=>[
            "status"=>2,
            "msg"=>"账号不存在"
        ]
    ];
}
echo json_encode($arr);