#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django import forms
from .models import Comment, Frend
from django.contrib.auth.forms import UserCreationForm
from .models import User


# 注册
class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email")


# 登录
class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


# 留言
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['name', 'text']


# 申请友链
class FrendForm(forms.ModelForm):
    class Meta:
        model = Frend
        fields = ['name', 'head', 'url', 'text']



