from django.shortcuts import render, redirect, HttpResponse, HttpResponseRedirect, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt

from blog.movie import get_music, get_douyin
from wbblog import settings
from .froms import RegisterForm, LoginForm, CommentForm, FrendForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Entry, Profile, Frend, Comment, Commentcoment
from django.db.models import Q
import markdown
from .Email import send_emai, send_conmment, send_my_conmment
import re
import json
from .req import get_header, get_number
from .headesimg import img, musics


# 分页
def fenye(request, contact_list):
    paginator = Paginator(contact_list, 8)
    page = request.GET.get('page')
    try:
        context = paginator.page(page)
        return context
    except PageNotAnInteger:
        context = paginator.page(1)
        return context
    except EmptyPage:
        context = paginator.page(paginator.num_pages)
        return context


# 主页
def index(request):
    header_img = img()
    contact_list = Entry.objects.order_by('-id')
    if request.user.is_authenticated:
        try:
            header = Profile.objects.filter(user_id=request.user.id)[0].user_img
        except:
            header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    else:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    context = fenye(request, contact_list)
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, "header": header})


# django
def django(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# flask学习
def flask(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# 爬虫教程
def pa(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# 生活推荐
def fu(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


def huo(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# 文章汇总
def huizong(request):
    header_img = img()
    contact_list = Entry.objects.all()
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# 友链
def frend(request):
    frends = Frend.objects.filter(yes=1)
    header_img = img()
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/frend.html', {'header_img': header_img, 'frends': frends, 'header': header})


# 视频
def video(request, lei_id):
    header_img = img()
    contact_list = Entry.objects.filter(name=lei_id)[::-1]
    context = fenye(request, contact_list)
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'header_img': header_img, "context": context, 'header': header})


# 视频播放页
def play(request, video_id):
    video = get_object_or_404(Entry, pk=video_id)
    video.increase_views()
    try:
        mp4 = re.findall('<a href="(.*?)"', video.body_text)[0]
    except:
        mp4 = video.body_text
    return render(request, 'blog/Dplay.html', {'viedo': video, 'mp4': mp4})


# 音乐
def music(request):
    mp3 = get_music()
    return render(request, 'blog/music.html', {'mp3': mp3})


# 吃豆人游戏
def dou(request):
    return render(request, 'blog/dou.html')


def cURL(request):
    number = get_number()
    return render(request, 'blog/req.html', {'number': number})


def get_curldata(request):
    curl = request.POST.get('curl_data')
    try:
        da = get_header(curl)
        data = json.dumps({'result': '获取成功!', 'curl_d': da})
        return HttpResponse(data)
    except Exception:
        data = json.dumps({'result': '获取失败!'})
        return HttpResponse(data)


# 文章详情
def deta(request, find_id):
    # 如果是登录的用户，查询他的头像，否则选取默认图片
    if request.user.is_authenticated:
        try:
            header = Profile.objects.filter(user_id=request.user.id)[0].user_img
        except:
            header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    else:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    try:
        text = Entry.objects.filter(id=find_id)[0]
        chrom = text.body_text[:100]
        text.increase_views()
        form = CommentForm()
        text.body_text = markdown.markdown(text.body_text)
        s_id = text.id - 1
        x_id = text.id + 1
        return render(request, 'blog/deta.html',
                      {'text': text, 'form': form, 'header_img': img, 's_id': s_id, 'x_id': x_id, "header": header,
                       'chrom': chrom})
    except:
        return render(request, '404.html')


# Ajax提交留言
def ajax_comment(request, comment_id):
    comment = Comment()
    name = request.user.username
    if len(name) != 0:
        head = request.POST.get('head_img')
        ad_user = get_object_or_404(User, pk=1).username
        text = request.POST.get('data').replace('<script>', '').replace('</script>', '')
        if ad_user in text:
            texts = text.replace(ad_user, '博主')
        else:
            texts = text
        url = request.POST.get('url').split('#')[0]
        title = request.POST.get('title')
        comment.name = name
        comment.head = head
        comment.text = texts
        comment.post_id = comment_id
        comment.save()
        data = json.dumps({'result': '留言成功!'})
        try:
            send_my_conmment(name, url, title, texts)
        except:
            pass
        return HttpResponse(data)
    else:
        data = json.dumps({'result': '留言失败!'})
        return HttpResponse(data)


# 获取留言返回前端
def get_comment(request, comment_id):
    comment_list = Comment.objects.filter(post_id=comment_id)[::-1]
    comment_list_text = ''
    ad_user = get_object_or_404(User, pk=1).username
    try:
        for comment in comment_list:
            try:
                user_ = User.objects.filter(username=comment.name)[0]
                header = Profile.objects.filter(user_id=user_.id)[0].user_img
            except:
                header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
            get_comment_list = Commentcoment.objects.filter(post_id=comment.id)
            find = '<hr><div class="findliu" id="' + str(
                comment.id) + '"><img id="header-img" style="border-radius: 6.25rem;    width: 3rem; height: 3rem;"<img src="' + header + '">' + '<p class="name">' + comment.name.replace(
                'admin', 'ZLOE').replace(ad_user,
                                         'ZLOE') + '</p><p class="liutext">' + comment.text + '</p>' + '<br>' + '<a class="id" onclick="hfcomment()" name=' + comment.name.replace(
                ad_user,
                'ZLOE') + ' data-id=' \
                   + str(comment.id) + '>回复</a>'
            for comment_to in get_comment_list:
                try:
                    user_ = User.objects.filter(username=comment_to.name)[0]
                    headers = Profile.objects.filter(user_id=user_.id)[0].user_img
                except:
                    headers = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
                find_2 = '<div class="comment_liu" data-id=' + str(
                    comment.id) + ' name="' + comment_to.name.replace(
                    'admin', 'ZLOE').replace(ad_user,
                                             'ZLOE') + '"><img id="header-img" style="border-radius: 6.25rem;    width: 3rem; height: 3rem;"<img src="' + headers + '">' \
                         + '<p class="name" style="color: black;">' + '<p class="name">' + comment_to.name.replace(
                    'admin', 'ZLOE').replace(ad_user,
                                             'ZLOE') + '</p><p class="comment_text" style="color: black;">' + comment_to.text + '</p>' + '<br>' + '<a class="id" onclick="hfcomment()"' + 'data-id=' + str(
                    comment.id) + ' name="' + comment_to.name.replace(
                    'admin', 'ZLOE').replace(ad_user, 'ZLOE') + '">回复</a>' + '</div></div> '
                find += find_2
            comment_list_text += find
            comments = json.dumps({'comment': comment_list_text})
        return HttpResponse(comments)
    except:
        comments = json.dumps({'result': '没有评论！'})
        return HttpResponse(comments)


# 二级评论提交
def comment_to_comment(request, comment_id):
    username = request.user.username
    ad_user = get_object_or_404(User, pk=1).username
    if len(username) != 0:
        comment_id_id = request.POST.get('comment_id')
        url = request.POST.get('url').split('#')[0]
        title = request.POST.get('title')
        find_name = Comment.objects.filter(id=comment_id_id)[0]
        find = User.objects.filter(username=find_name.name)[0]
        comment_text = request.POST.get('comment_text').replace('<script>', '').replace('</script>', '')
        try:
            send_conmment(url, title, username.replace('admin', 'ZLOE').replace(ad_user, 'ZLOE'), find.username,
                          find.email, find_name.text, comment_text)
        except:
            pass
        head = request.POST.get('head_img')
        comment = Commentcoment()
        comment.head = head
        comment.name = username
        comment.text = '@' + comment_text
        comment.post_id = comment_id_id
        comment.save()
        data = json.dumps({"result": "回复成功!"})
        return HttpResponse(data)
    else:
        data = json.dumps({"result": "回复失败!"})
        return HttpResponse(data)


# 个人资料中心
def userdeta(request, user_id):
    if str(user_id) == str(request.user.id):
        return render(request, 'blog/user.html')
    else:
        return render(request, '404.html')


# 更新用户信息
def updatauser(request, user_id):
    url_id = request.POST.get('url').split('/')[-1].replace('.html','')
    name = request.POST.get('name').replace('<script>', '').replace('</script>', '')
    img_url = request.POST.get('img_url').replace('<script>', '').replace('</script>', '')
    id_usertext = request.POST.get('id_usertext').replace('<script>', '').replace('</script>', '')
    if str(url_id) == str(user_id):
        profile = Profile.objects.filter(user_id=user_id)
        print(profile)
        if len(profile) != 0:
            profile.update(user_id=user_id, username=name, user_img=img_url, usertext=id_usertext)
            data = {'result': "个人信息修改成功！"}
            result_data = json.dumps(data)
            return HttpResponse(result_data)
        else:
            profile = Profile()
            profile.user_id = user_id
            profile.username = name
            profile.user_img = img_url
            profile.usertext = id_usertext
            profile.save()
            data = {'result': "个人信息修改成功！"}
            result_data = json.dumps(data)
            return HttpResponse(result_data)
    else:
        data = {'result': "个人信息修改失败！"}
        result_data = json.dumps(data)
        return HttpResponse(result_data)


# 五子棋
def wuzi(request):
    return render(request, 'blog/AiringGo.html')



# markdown
def markdownzloe(request):
    return render(request, 'blog/markdown.html', {'header_img': img})


# 简历生成
def jian(request):
    return render(request, 'blog/jianli.html')


# 申请链接
def getfrend(request):
    header_img = img()
    if request.method == 'POST':
        form = FrendForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.save()
            send_emai()
            return HttpResponseRedirect('/frend')
        else:
            return HttpResponse("<script>alert('留言失败！')</script>")
    else:
        form = FrendForm()
        try:
            header = Profile.objects.filter(user_id=request.user.id)[0].user_img
        except:
            header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
        return render(request, 'blog/getfrend.html', {'form': form, 'header_img': header_img, 'header': header})


# 搜索
def search(request):
    header_img = img()
    q = request.GET.get('q')
    post_list = Entry.objects.filter(Q(title__icontains=q) | Q(body_text__icontains=q))
    try:
        header = Profile.objects.filter(user_id=request.user.id)[0].user_img
    except:
        header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
    return render(request, 'blog/index.html', {'context': post_list, 'header_img': header_img, 'header': header})


# 注册
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/login')
    else:
        form = RegisterForm()
    return render(request, 'blog/register.html', context={'form': form})


# 登录
def user_login(request):
    if not request.user.is_authenticated:
        if request.method == 'POST':
            form = LoginForm(request.POST)
            if form.is_valid():
                username = request.POST['username']
                password = request.POST['password']
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    if user.is_active:
                        login(request, user)
                        return HttpResponseRedirect('/')
                    else:
                        return HttpResponse('<h1>密码错误！</h1>')
                else:
                    return HttpResponse('<h1>登录失败！</h1>')
        else:
            return render(request, 'blog/login.html')

    return HttpResponseRedirect('/')


# 登出
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/')


# m3u8测试
def m3u8(request):
    return render(request, 'blog/m3u8.html')


def one_links(request):
    return render(request, 'blog/links.html')

# 上传图片
@csrf_exempt
def up_img(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        if id == '1':
            f1 = request.FILES.get('imgdata')
            with open('post_img.jpg', 'wb') as pic:
                for c in f1.chunks():
                    pic.write(c)
            try:
                img_id = post_img()
                data = json.dumps({'result':'ok!','img_id':img_id})
                return HttpResponse(data)
            except Exception:
                data = json.dumps({'result': 'erro!'})
                return HttpResponse(data)
        else:

            img_url = request.POST.get('imgdata')
            result = write_img(img_url)
            if result == 'ok!':
                img_id = post_img()
                data = json.dumps({'result': 'ok!', 'img_id': img_id})
                return HttpResponse(data)
            else:
                data = json.dumps({'result': 'erro!'})
                return HttpResponse(data)
    else:
        return render(request,'blog/up_img.html')

@csrf_exempt
def get_dou(request):
    if request.method == 'POST':
        url = request.POST.get('dou_url')
        try:
            data_url = get_douyin(url)
            data = {'result':'获取成功!','data_url':data_url}
            return HttpResponse(json.dumps(data))
        except Exception:
            data = {'result': '获取失败!'}
            return HttpResponse(json.dumps(data))

    else:
        return render(request,'blog/douyin.html')

# 电影分页
def fenmvie(request, contact_list):
    paginator = Paginator(contact_list, 20)
    page = request.GET.get('page')
    try:
        context = paginator.page(page)
        return context
    except PageNotAnInteger:
        context = paginator.page(1)
        return context
    except EmptyPage:
        context = paginator.page(paginator.num_pages)
        return context


# 评论api开发,返回json数据
def commentapi(request, comment_id):
    ad_user = get_object_or_404(User, pk=1).username
    comment_list = Comment.objects.filter(post_id=comment_id)[::-1]
    comment_list_json = []
    if len(comment_list) > 0:
        for comment in comment_list:
            try:
                user_ = User.objects.filter(username=comment.name)[0]
                header = Profile.objects.filter(user_id=user_.id)[0].user_img
            except:
                header = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
            get_comment_list = Commentcoment.objects.filter(post_id=comment.id)
            comment_to_list = []
            for comment_to in get_comment_list:
                try:
                    user_ = User.objects.filter(username=comment.name)[0]
                    headerto = Profile.objects.filter(user_id=user_.id)[0].user_img
                except:
                    headerto = '//wx1.sinaimg.cn/large/006gFOhdly1fr0hdrzlolj30b40b4dg7.jpg'
                a_li = {
                    "post_id": comment.id,
                    "name": comment_to.name.replace(ad_user, '博主'),
                    "head": headerto,
                    "text": comment_to.text,
                    "created_time": str(comment_to.created_time)[:16],
                }
                comment_to_list.append(a_li)
            b_li = {
                "post_id": comment.id,
                "name": comment.name.replace(ad_user, '博主'),
                "head": header,
                "text": comment.text,
                "created_time": str(comment.created_time)[:16],
                "comment_to": comment_to_list,
            }
            comment_list_json.append(b_li)
        find = {"result": "获取成功!", "data": comment_list_json}
        return HttpResponse(json.dumps(find))
    else:
        return HttpResponse(json.dumps({'result': "暂时没有评论!"}))

