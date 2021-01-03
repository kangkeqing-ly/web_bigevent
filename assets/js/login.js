/*
 * @Author: your name
 * @Date: 2021-01-03 18:14:51
 * @LastEditTime: 2021-01-03 21:39:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \康克卿大事件\assets\js\login.js
 */
$(function () {
  /* 点击去注册的链接 */
  $('#link_reg').on('click', function () {
    $('#login-box').hide()
    $('#reg-box').show()
  })
  //点击去登录的链接
  $('#link-login').on('click', function () {
    $('#reg-box').hide()
    $('#login-box').show()
  })
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('#reg-box [ name="password" ]').val()
      if (pwd !== value) {
        return '两次密码不一样'
      }
    }
  })
  /* 监听注册 */
  var data = { username: $('#form_reg [ name="username"]').val(), password: $('#form_reg [ name="password"]') }
  $('#form_reg').on('sumbit', function (e) {
    e, preventDefault()
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      $('#link_login').click()
    })
  })
  /* 监听登录 */
  $('#form_login').on('sumbit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // return console.log(res.token)
        //localStorage 属性允许在浏览器中存储 key/value 对的数据。
        //   保存数据语法：localStorage.setItem("key", value);
        localStorage.setItem('token', res.token)
        //跳转到后台
        location.href = '/index.html'
      }
    })
  })
})
