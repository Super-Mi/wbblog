#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.index, name='index'),
    path('program/<int:find_id>.html', views.deta, name='deta'),
    path('comment/<int:comment_id>', views.ajax_comment, name='comment'),
    path('get_comment/<int:comment_id>', views.get_comment, name='get_comment'),
    path('comment_to_comment/<int:comment_id>', views.comment_to_comment, name='comment_to_comment'),
    path('django/<int:lei_id>.html', views.django, name='django'),
    path('flask/<int:lei_id>.html', views.flask, name='flask'),
    path('pa/<int:lei_id>.html', views.pa, name='pa'),
    path('fu/<int:lei_id>.html', views.fu, name='fu'),
    path('huo/<int:lei_id>.html', views.huo, name='huo'),
    path('hui.html', views.huizong, name='hui'),
    path('video/<int:lei_id>.html', views.video, name='video'),
    path('play/<int:video_id>.html', views.play, name='paly'),
    path('links.html', views.frend, name='frend'),
    path('getfrend.html', views.getfrend, name='getfrend'),
    path('wuzi.html', views.wuzi, name='wuzi'),
    path('markdown.html', views.markdownzloe, name='markdown'),
    path('jian.html', views.jian, name='jian'),
    path('music.html', views.music, name='music'),
    path('dou.html', views.dou, name='dou'),
    path('curl.html', views.cURL, name='curl'),
    path('curl_data.html', views.get_curldata, name='curldata'),
    path('search.html', views.search, name='search'),
    path('register.html', views.register, name='register'),
    path('login.html', views.user_login, name='login'),
    path('logout.html', views.user_logout, name='logout'),
    path('user/<int:user_id>.html', views.userdeta, name='user'),
    path('updatauser/<int:user_id>.html', views.updatauser, name='updatauser'),
    path('commentapi/<int:comment_id>', views.commentapi, name='commentapi'),
    path('m3u8.html', views.m3u8, name='m3u8'),
    path('one_links.html', views.one_links, name='one_links'),
    path('api.up_img_links', views.up_img, name='up_img'),
    path('api.dou_yin_links', views.get_dou, name='douyin'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
