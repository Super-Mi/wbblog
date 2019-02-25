from django.db import models
import datetime
from django.contrib.auth.models import User
from simditor.fields import RichTextField
from .headesimg import img

# 注意每次更改后执行加载模型
# 1. python manage.py makemigrations
# 加载数据库
# 2. python manage.py migrate
# 创建管理员
# python manage.py createsuperuser


# 用户注册
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1, verbose_name='用户名')
    username = models.CharField('姓名', max_length=250)
    user_img = models.CharField('头像', max_length=1000,
                                default='http://wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg')
    usertext = models.TextField('个人介绍', max_length=250, default=' ')
    usertime = models.DateTimeField('加入时间', default=datetime.datetime.now())

    class Meta:
        verbose_name = '用户管理'
        verbose_name_plural = verbose_name


class Entry(models.Model):
    name = models.SmallIntegerField('分类',
                                    choices=(
                                        (1, 'django'), (2, 'flask学习'), (3, '爬虫教程'), (4, '编程项目'), (5, '生活推荐'),(6,'视频分享')),
                                    default=0)
    title = models.CharField('标题', max_length=255)
    image = models.CharField('图片', max_length=1000,default=img())
    # body_text = RichTextField('正文')
    body_text = models.TextField('正文')
    input_time = models.DateTimeField('时间', default=datetime.datetime.now())
    out_time = models.DateTimeField('修改时间', default=datetime.datetime.now())
    views = models.PositiveIntegerField('阅读量', default=0)

    def __str__(self):
        return self.title

    def increase_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    class Meta:
        verbose_name = '博文管理'
        verbose_name_plural = verbose_name


# 一级评论
class Comment(models.Model):
    head = models.CharField('头像', max_length=1000,
                            default='http://wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg')
    name = models.CharField('姓名', max_length=100)
    text = models.TextField('内容')
    created_time = models.DateTimeField('时间', auto_now_add=True)
    post = models.ForeignKey('blog.Entry', on_delete=models.CASCADE, verbose_name='文章')

    class Meta:
        verbose_name = '博文评论'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.text[:20]


# 二级评论
class Commentcoment(models.Model):
    head = models.CharField('头像', max_length=1000,
                            default='http://wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg')
    name = models.CharField('姓名', max_length=100)
    text = models.TextField('内容')
    created_time = models.DateTimeField('时间', auto_now_add=True)
    post = models.ForeignKey(Comment, on_delete=models.CASCADE, verbose_name='留言')

    class Meta:
        verbose_name = '博文回复'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.text[:20]


class Frend(models.Model):
    name = models.CharField('网站名', max_length=250)
    head = models.CharField('头像', max_length=1000)
    url = models.URLField('网站链接')
    text = models.TextField('网站介绍')
    yes = models.SmallIntegerField('状态', choices=((0, '未通过'), (1, '通过'),), default=0)
    created_time = models.DateTimeField('时间', default=datetime.datetime.now())

    class Meta:
        verbose_name = '友情链接'
        verbose_name_plural = verbose_name

