<?php
include('./mysql.php');
$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];
$res=mysqli_query($link,"select * from user where username='$username'");
$row=mysqli_fetch_assoc($res);
if($row){
    $arr=[
        "meta"=>[
            "status"=>2,
            "msg"=>"用户名被占用"
        ]
        ];
}else{
    $res=mysqli_query($link,"insert into user(username,password,email) values ('$username','$password','$email')");
    if($res){
        $arr=[
            "meta"=>[
                "status"=>0,
                "msg"=>"注册成功"
            ]
        ];
    }else{
        $arr=[
            "meta"=>[
                "status"=>1,
                "msg"=>"注册失败"
            ]
        ];
    }
}
echo json_encode($arr);