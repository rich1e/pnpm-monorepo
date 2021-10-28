<script setup lang="ts">
/**
 * @description tiny 使用参考
 * @see https://juejin.cn/post/6986460075116199973
 * @see https://juejin.cn/post/7012164876533514277
 * @see https://juejin.cn/post/7008075165942677540
 * @see https://my.oschina.net/mingriyi/blog/3154448
 * @see https://www.cnblogs.com/huihuihero/p/13877589.html
 */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'

import 'tinymce/themes/silver'
import 'tinymce/icons/default'

import 'tinymce/plugins/advlist' //高级列表
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/autoresize' //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave' //自动存稿
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/code' //编辑源码
import 'tinymce/plugins/codesample' //代码示例
import 'tinymce/plugins/directionality' //文字方向
import 'tinymce/plugins/emoticons' //表情
import 'tinymce/plugins/fullpage' //文档属性
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/help' //帮助
import 'tinymce/plugins/hr' //水平分割线
import 'tinymce/plugins/image' //插入编辑图片
import 'tinymce/plugins/importcss' //引入css
import 'tinymce/plugins/insertdatetime' //插入日期时间
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/lists' //列表插件
// import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/paste' //粘贴插件
import 'tinymce/plugins/preview' //预览
// import 'tinymce/plugins/print' //打印
import 'tinymce/plugins/quickbars' //快速工具栏
import 'tinymce/plugins/save' //保存
import 'tinymce/plugins/searchreplace' //查找替换
import 'tinymce/plugins/tabfocus' //切入切出，按tab键切出编辑器，切入页面其他输入框中
import 'tinymce/plugins/table' //表格
import 'tinymce/plugins/template' //内容模板
import 'tinymce/plugins/textcolor' //文字颜色
import 'tinymce/plugins/textpattern' //快速排版
import 'tinymce/plugins/toc' //目录生成器
import 'tinymce/plugins/visualblocks' //显示元素范围
import 'tinymce/plugins/visualchars' //显示不可见字符
import 'tinymce/plugins/wordcount' //字数统计

import { watch, ref, onMounted } from 'vue'
/* global defineProps, defineEmits */
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    default:
      'preview searchreplace autolink directionality emoticons visualblocks visualchars fullscreen image link code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave',
  },
  toolbar: {
    type: [String, Array],
    default:
      'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
      styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
      table image charmap emoticons hr pagebreak insertdatetime preview | code selectall | indent2em lineheight formatpainter axupimgs',
  }
})

const emits = defineEmits(['input', 'onClick'])

const initOptions = ref({
  /**
   * @see https://juejin.cn/post/6986460075116199973#heading-5
   */
  emoticons_database_url: '/tinymce/emoticons/js/emojis.js', //更改表情插件路径
  /**
   * @see https://juejin.cn/post/6986460075116199973#heading-1
   */
  language_url: '/tinymce/langs/zh_CN.js', //引入语言包文件
  language: 'zh_CN', //语言类型

  skin_url: '/tinymce/skins/ui/oxide', //皮肤：浅色

  plugins: props.plugins, //插件配置
  toolbar: props.toolbar, //工具栏配置，设为false则隐藏
  // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

  fontsize_formats:
    '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
  font_formats:
    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

  height: 600, //注：引入autoresize插件时，此属性失效
  placeholder: '在这里输入文字...',
  branding: false, // 去水印, tiny技术支持信息是否显示
  resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  statusbar: true,  //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, //元素路径是否显示

  // content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式
  /**
   * @see https://www.tiny.cloud/docs/configure/content-appearance/#content_css
   * @see https://juejin.cn/post/6986460075116199973#heading-4
   */
  content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

  // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
  // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
  // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
  // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
  images_upload_handler: (blobInfo: any, success: any, failure: any) => {
    // 默认插入base64方式
    // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
    // success(img)
    /**
     * @description blob 相关的资料
     * @see https://juejin.cn/post/6844904178725158926
     * @see https://github.com/gauseen/blog/issues/19
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
     * @see https://juejin.cn/post/6844903783533658119
     */
    console.log(blobInfo, 'blobInfo')
    const fileType = blobInfo.blob().type
    const fileName = blobInfo.filename && blobInfo.filename() || blobInfo.blob().name
    // 格式校验
    const isAccept = fileType === 'image/jpeg'
      || fileType === 'image/png'
      || fileType === 'image/GIF'
      || fileType === 'image/jpg'
      || fileType === 'image/BMP';
    // 大小校验
    if (blobInfo.blob().size/1024/1024 > 2) {
      failure("上传失败，图片大小请控制在 2M 以内")
      // _this.$message.warning('上传失败，图片大小请控制在 2M 以内')
    } else if (!isAccept) {
      // _this.$message.warning('图片格式错误')
      failure('图片格式错误')
    } else {
      //上传
      const formData = new FormData()
      // 服务端接收文件的参数名，文件数据，文件名
      formData.append('file', blobInfo.blob(), fileName)
      const upload_url = 'http://localhost:3300/upload'

      /**
       * @description 这里调用你的上传方法将参数传递至后端
       * @see https://www.sayers3.com/multipartformdata.html
       */
      axios.post(upload_url, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((res: any) => {
        console.log(res)
        const { data: { data: { imgUrl } } } = res
        // 这里返回的是你图片的地址
        success(imgUrl)
      }).catch((err) => {
        console.log(err)
        failure('上传失败')
      })
    }
  },
  init_instance_callback: (editor: any) => {
    /**
     * @see https://juejin.cn/post/6871446972906405902
     */
    console.log(editor)
    editor.setContent('<p>123</p>')
    // editor.on('NodeChange Change KeyUp SetContent', () => {
    editor.on('NodeChange Change', () => {
      console.log(editor.getContent())
      emits('input', editor.getContent())
    })
  }
})

const contentValue = ref(props.value)

onMounted(() => {
  tinymce.init({})
})

watch(
  () => props.value,
  (newValue) => {
    contentValue.value = newValue
  }
)

// watch(
//   contentValue,
//   (newValue) => {
//     console.log(newValue)
//     emits('input', newValue)
//   }
// )

const clickHandler = (e: any) => {
  console.log('clickHandler')
  emits('onClick', e, tinymce)
}
/* global defineExpose */
defineExpose({
  contentValue
})

</script>
<template>
  <div class="editor-box">
    <Editor
      v-model="contentValue"
      :init="initOptions"
      :disabled="disabled"
      @onClick="clickHandler"
    />
  </div>
</template>

<style scoped>
.editor-box {
  width: 800px;
  margin: 0 auto;
}
</style>
