#!/usr/bin/env python
# -*- coding: utf-8 -*-
import xadmin
from .models import Entry, Profile, Comment, Frend, Commentcoment


class EntryAdmin(object):
    style_fields = {"detail": "ueditor"}
    list_display = ['title', 'name', 'views', 'input_time']
    list_filter = ['name']
    search_fields = ['name']


class ProfileAdmin(object):
    list_display = ('user', 'username', 'usertext', 'usertime')
    search_fields = ['user']


class CommentAdmin(object):
    list_display = ('name', 'post', 'created_time')
    search_fields = ['name']
    list_filter = ['post']


class CommentcomentAdmin(object):
    list_display = ('name', 'post', 'created_time')
    search_fields = ['name']
    list_filter = ['post']


class FrendAdmin(object):
    list_display = ('name', 'url', 'yes', 'created_time')


xadmin.site.register(Entry, EntryAdmin)
xadmin.site.register(Profile, ProfileAdmin)
xadmin.site.register(Comment, CommentAdmin)
xadmin.site.register(Commentcoment, CommentcomentAdmin)
xadmin.site.register(Frend, FrendAdmin)

