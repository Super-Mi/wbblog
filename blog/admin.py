from django.contrib import admin
from .models import Entry, Profile, Comment, Frend


class EntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'views', 'input_time')
    list_filter = ['name']
    search_fields = ['name']

    '''class Media:
        css = {'all':(
            'css/simditor.css',
            )}
        js = (
            'js/simditor/jquery.js',
            'js/simditor/marked.js',
            'js/simditor/module.js',
            'js/simditor/uploader.js',
            'js/simditor/hotkeys.js',
            'js/simditor/simditor.js',
            'js/simditor/textarea.js',
        )'''
    # class Media:
    #     css = {'all': (
    #         'css/simditor.css',
    #         'https://msterzhang.github.io/css/markdown.css',
    #     )}
    #     js = (
    #         'https://msterzhang.github.io/js/jquery.js',
    #         'https://msterzhang.github.io/js/marked.js',
    #         'https://msterzhang.github.io/js/to-markdown.js',
    #         'js/simditor/module.js',
    #         'js/simditor/uploader.js',
    #         'js/simditor/hotkeys.js',
    #         'js/simditor/simditor.js',
    #         'https://msterzhang.github.io/js/markdown.js',
    #
    #         # 配置文件
    #         'https://msterzhang.github.io/js/config.js',
    #     )
    # class Media:
    #     js = (
    #         'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    #         '//unpkg.com/wangeditor/release/wangEditor.min.js',
    #         'js/simditor/wconfig.js',
    #     )


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'username', 'usertext', 'usertime')
    search_fields = ['user']


class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'post', 'created_time')
    search_fields = ['name']
    list_filter = ['post']


class FrendAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'yes', 'created_time')


admin.site.register(Entry)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Frend, FrendAdmin)
