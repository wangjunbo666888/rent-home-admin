<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 个人信息卡片 -->
      <el-col :span="8">
        <el-card class="profile-card">
          <div class="profile-header">
            <div class="avatar-container">
              <el-avatar :size="100" :src="userInfo.avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">更换头像</el-button>
              </el-upload>
            </div>
            <h3 class="user-name">{{ userInfo.realName }}</h3>
            <p class="user-role">{{ getRoleLabel(userInfo.role) }}</p>
          </div>
          
          <el-divider />
          
          <div class="profile-info">
            <div class="info-item">
              <span class="label">用户名：</span>
              <span class="value">{{ userInfo.username }}</span>
            </div>
            <div class="info-item">
              <span class="label">手机号：</span>
              <span class="value">{{ userInfo.phone }}</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱：</span>
              <span class="value">{{ userInfo.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">最后登录：</span>
              <span class="value">{{ userInfo.lastLoginTime }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <!-- 详细信息 -->
      <el-col :span="16">
        <el-card>
          <template #header>
            <span>个人信息</span>
          </template>
          
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="真实姓名" prop="realName">
                  <el-input v-model="form.realName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="form.gender">
                    <el-radio label="male">男</el-radio>
                    <el-radio label="female">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    placeholder="选择出生日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="form.idCard" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="地址" prop="address">
                  <el-input v-model="form.address" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item>
              <el-button type="primary" @click="handleSubmit" :loading="loading">
                保存修改
              </el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        
        <!-- 修改密码 -->
        <el-card style="margin-top: 20px;">
          <template #header>
            <span>修改密码</span>
          </template>
          
          <el-form
            ref="passwordFormRef"
            :model="passwordForm"
            :rules="passwordRules"
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="原密码" prop="oldPassword">
                  <el-input 
                    v-model="passwordForm.oldPassword" 
                    type="password" 
                    show-password
                  />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="新密码" prop="newPassword">
                  <el-input 
                    v-model="passwordForm.newPassword" 
                    type="password" 
                    show-password
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input 
                    v-model="passwordForm.confirmPassword" 
                    type="password" 
                    show-password
                  />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item>
              <el-button type="primary" @click="handleChangePassword" :loading="passwordLoading">
                修改密码
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'

export default {
  name: 'Profile',
  components: {
    User
  },
  setup() {
    const formRef = ref(null)
    const passwordFormRef = ref(null)
    const loading = ref(false)
    const passwordLoading = ref(false)
    
    const userInfo = reactive({
      id: 1,
      username: 'admin',
      realName: '系统管理员',
      phone: '13800138000',
      email: 'admin@example.com',
      role: 'admin',
      avatar: '',
      lastLoginTime: '2024-01-20 15:30:00'
    })
    
    const form = reactive({
      realName: '',
      gender: 'male',
      phone: '',
      email: '',
      birthday: '',
      idCard: '',
      address: ''
    })
    
    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    
    const rules = {
      realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ]
    }
    
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (passwordForm.confirmPassword !== '') {
          passwordFormRef.value.validateField('confirmPassword')
        }
        callback()
      }
    }
    
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    
    const passwordRules = {
      oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' }
      ],
      newPassword: [
        { validator: validatePass, trigger: 'blur' }
      ],
      confirmPassword: [
        { validator: validatePass2, trigger: 'blur' }
      ]
    }
    
    const getRoleLabel = (role) => {
      const roleMap = {
        admin: '超级管理员',
        manager: '管家',
        user: '普通用户'
      }
      return roleMap[role] || role
    }
    
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
    
    const getUserProfile = () => {
      // 模拟获取用户信息
      const mockData = {
        realName: '系统管理员',
        gender: 'male',
        phone: '13800138000',
        email: 'admin@example.com',
        birthday: '1990-01-01',
        idCard: '110101199001011234',
        address: '北京市朝阳区建国路88号'
      }
      
      Object.assign(form, mockData)
    }
    
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          
          // 模拟API调用
          setTimeout(() => {
            ElMessage.success('个人信息更新成功')
            loading.value = false
          }, 1000)
        }
      })
    }
    
    const handleReset = () => {
      getUserProfile()
      ElMessage.info('已重置为原始数据')
    }
    
    const handleChangePassword = () => {
      passwordFormRef.value.validate((valid) => {
        if (valid) {
          passwordLoading.value = true
          
          // 模拟API调用
          setTimeout(() => {
            ElMessage.success('密码修改成功')
            passwordForm.oldPassword = ''
            passwordForm.newPassword = ''
            passwordForm.confirmPassword = ''
            passwordLoading.value = false
          }, 1000)
        }
      })
    }
    
    onMounted(() => {
      getUserProfile()
    })
    
    return {
      formRef,
      passwordFormRef,
      loading,
      passwordLoading,
      userInfo,
      form,
      passwordForm,
      rules,
      passwordRules,
      getRoleLabel,
      beforeAvatarUpload,
      handleSubmit,
      handleReset,
      handleChangePassword
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.profile-card {
  .profile-header {
    text-align: center;
    
    .avatar-container {
      margin-bottom: 20px;
      
      .avatar-uploader {
        margin-top: 10px;
      }
    }
    
    .user-name {
      margin: 10px 0 5px 0;
      font-size: 18px;
      font-weight: bold;
      color: #303133;
    }
    
    .user-role {
      margin: 0;
      color: #909399;
      font-size: 14px;
    }
  }
  
  .profile-info {
    .info-item {
      display: flex;
      margin-bottom: 10px;
      
      .label {
        width: 80px;
        color: #606266;
        font-weight: 500;
      }
      
      .value {
        flex: 1;
        color: #303133;
      }
    }
  }
}
</style> 