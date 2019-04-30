<template>
  <div class="staff">
    <div class="staff-headimg">
      <img :src="staff.head_icon" alt="" v-imgField>
    </div>
    <div class="staff-message">
      <div class="name-mark">
        <span class="name">{{ staff.true_name }}</span>
      </div>
      <p class="department">部门：{{ staff.depart }}</p>
      <p class="workingYear-evaluate">
        <span class="workingYear">工作：{{ staff.worktime }}年</span>
      </p>
      <p class="department">级别：{{staff.employee_level}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['staff']
  }
</script>

<style scoped lang="scss">
  .staff {
    padding: 36px 22px;
    display: flex;
    border-bottom: 1px solid #e7e7e7;/*no*/
    &:last-child {
      border-bottom: 0;
    }
    .staff-headimg {
      width: 148px;
      height: 148px;
      margin-right: 19px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .staff-message {
      flex: 1;
      .name-mark {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 30px;
          color: #333;
        }
      }
      .department, .workingYear-evaluate {
        font-size: 24px;
        margin-top: 20px;
      }
      .workingYear-evaluate {
        margin-top: 13px;
        display: flex;
        span {
          flex: 1;
        }
      }
    }
  }
</style>
