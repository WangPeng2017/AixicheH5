<template>
  <div class="lif-step-item" :class=" { 'lif-step-item-with-tail' : !currentStepLast} ">
    <div :class="'lif-step-item-tail ' + 'lif-step-item-tail-' + currentStatus" v-show="!currentStepLast" :style="{right: $parent.gutter}"></div>
    <div :class="'lif-step-item-head ' + 'lif-step-item-head-' + currentStatus">
      <div class="lif-step-item-head-inner">
        <span v-if="!icon && currentStatus!='finish'" class="lif-step-item-icon">{{currentStepNumber}}</span>
        <span v-else :class="'lif-step-item-icon ' + 'lif-step-item-' + iconName">
        <icon type="success_no_circle" class="lif-step-item-checked"></icon>
      </span>
      </div>
    </div>
    <div :class="'lif-step-item-main ' + 'lif-step-item-main-' + currentStatus" :style="{backgroundColor: $parent.backgroundColor, paddingRight: currentStepLast ? 0 : $parent.gutter}">
      <span class="lif-step-item-title">{{title}}</span>
      <div class="lif-step-item-description">{{description}}</div>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon'
  export default {
    name: 'step-item',
    props: {
      title: String,
      description: String,
      stepNumber: Number,
      stepLast: Boolean,
      icon: String,
      status: String,
      tailWidth: Object
    },
    computed: {
      iconName () {
        return this.icon || 'check'
      }
    },
    created () {
      this.currentStatus = this.status
      this.currentStepLast = this.stepLast
      this.currentStepNumber = this.stepNumber
    },
    data () {
      return {
        currentStatus: '',
        currentStepLast: false,
        currentStepNumber: 0
      }
    },
    components: {
      Icon
    }
  }
</script>
