<template>
  <transition @after-leave="afterLeave">
    <div class="vue-alert" v-if="showModal">
      <div class="vue-mask" @click="Mask"></div>
      <div class="vue-popout" :class="{'remind': !buttons || !buttons.length}">
        <div class="main">
          <div class="title" v-if="title">{{title}}</div>
          <div class="text" v-html="text" v-if="text"></div>
          <input autofocus class="text-input" :placeholder="placeholder" v-model="value" v-if="input" />
        </div>
        <div
          class="footer"
          v-if="buttons && buttons.length"
          :class="{'btns': buttons.length >= 2}">
          <a
            href="javascript:;"
            class="btn" v-for="(button, index) in buttons"
            @click.prevent.stop="onClick(button, index)">{{button.text}}
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import defer from './defer.js'
  // css 动画执行的时间
  const ANIMATION_TIME = 400
  export default {
    data: () => ({
      value: '',
      showModal: false
    }),
    props: [
      'title',
      'text',
      'input',
      'placeholder',
      'onClick',
      'remindDuration',
      'mask',
      'buttons'
    ],
    methods: {
      activate: function () {
        this._deferred = defer()
        this.showModal = true

        // no buttons, remind (ANIMATION_TIME + remindDuration) time, then auto remove
        if (!this.buttons || !this.buttons.length) {
          setTimeout(() => {
            this.showModal = false
            this._deferred.resolve()
          }, ANIMATION_TIME + this.remindDuration)
        }

        return this._deferred.promise
      },
      onClick: function (button, index) {
        var cbkData = {
          index: index,
          button: button,
          value: this.value
        }

        if (typeof button.onClick === 'function') {
          button.onClick(cbkData)
        }

        this._deferred.resolve(cbkData)
        this.showModal = false
      },
      Mask () {
        if (this.mask) {
          this.showModal = false
        }
      },
      afterLeave: function () {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../src/assets/scss/mixin.scss';
  .vue-alert{
    .vue-mask{
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0,0,0,.6);
    }
    .vue-popout{
      position: fixed;
      z-index: 5000;
      width: 80%;
      max-width: size(300);
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      text-align: center;
      border-radius: size(3);
      overflow: hidden;
      .main{
        padding: 0 size(15);
      }
      .title{
        font-weight: 400;
        @include font-size(18px);
        padding: size(20) size(25) size(5);
      }
      .text{
        padding: 0 size(20) size(10);
        min-height: size(40);
        @include font-size(15px);
        line-height: 1.3;
        word-wrap: break-word;
        word-break: break-all;
        color: #999;
      }
      .text-input{
        outline: 0;
        box-sizing: border-box;
        height: size(30);
        background: #fff;
        margin: size(15) 0;
        // margin-top: size(15);
        padding: 0 size(5);
        border: size(1) solid #a0a0a0;
        border-radius: size(5);
        width: 100%;
        @include font-size(15px);
        font-family: inherit;
        display: block;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        appearance: none;
      }
      .footer{
        position: relative;
        line-height: size(48);
        @include font-size(18px);
        display: flex;
        &:after{
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: size(1);
          border-top: size(1) solid #d5d5d6;
          color: #d5d5d6;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
        }
        .btn{
          display: block;
          flex: 1;
          color: #3cc51f;
          text-decoration: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          position: relative;
          &:after{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: size(1);
            bottom: 0;
            border-left: size(1) solid #d5d5d6;
            color: #d5d5d6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(.5);
            transform: scaleX(.5);
          }
        }
        .btn:first-child{
          color: #000;
          &:after{
            content: none;
          }
        }
      }
    }
    .remind{
      // background-color: #000;
      .title{
        padding: size(20) size(25);
        // color: #FFF;
      }
    }
    &.v-enter{
      opacity: 0;
      .vue-popout{
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(1.185);
      }
    }
    &.v-enter-active{
      transition: opacity .4s;
      .vue-popout{
        transition: all .4s;
      }
    }
    &.v-leave-active{
      opacity: 0;
      transition: opacity .4s;
      .vue-popout{
        opacity: 0;
        z-index: 10999;
        transform: translate3d(-50%, -50%, 0) scale(0.815);
        transition: all .4s;
      }
    }
  }
</style>
