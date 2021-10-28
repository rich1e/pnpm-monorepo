<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import Tinymce from './components/TEditor.vue'

import { ref } from 'vue'
const editorRef: any = ref({})
const editorVal = ref('')
const textArea = ref('')
const contentHtml = editorRef && editorRef.contentValue || ''

const submitHandler = (event: any) => {
  console.log(editorVal.value)
  console.log(textArea.value)
  editorVal.value = textArea.value
  /**
   * @see https://www.programminghunter.com/article/687668085/
   */
  event.preventDefault();
}

const cleanHandler = () => {
  textArea.value = ''
}
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div style="display: flex;">
    <Tinymce
      ref="editorRef"
      v-model:value="editorVal"
    />
    <div style="width: 800px; margin-left: 10px; overflow: hidden; text-align: left;">
      <p>输入源码：</p>
      <div style="text-align: left; overflow: auto; height: 80px; border: 1px dashed darkmagenta; padding: 3px;">
        {{ editorRef.contentValue }}
      </div>
      <p>预览效果：</p>
      <div style="overflow: auto; height: 80px; border: 1px dashed darkmagenta; padding: 3px;" v-html="contentHtml"></div>
      <p>提交内容：</p>
      <form>
        <textarea style="width: 99%; height: 120px;" v-model="textArea"></textarea>
        <button type="submit" @click="submitHandler">提交</button>
        <button type="reset" style="margin-left: 10px;" @click="cleanHandler">清空</button>
      </form>
    </div>
  </div>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
