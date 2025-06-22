<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑用户' : '新增用户' }}</span>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input 
                v-model="form.username" 
                placeholder="请输入用户名"
                :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户角色" prop="role">
              <el-select v-model="form.role" placeholder="请选择用户角色" style="width: 100%">
                <el-option label="超级管理员" value="admin" />
                <el-option label="管家" value="manager" />
                <el-option label="普通用户" value="user" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="active">正常</el-radio>
                <el-radio label="inactive">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" v-if="!isEdit">
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input 
                v-model="form.password" 
                type="password" 
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input 
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="请再次输入密码"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="form.idCard" placeholder="请输入身份证号" />
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
            <el-form-item label="入职日期" prop="hireDate">
              <el-date-picker
                v-model="form.hireDate"
                type="date"
                placeholder="选择入职日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="3"
                placeholder="请输入备注信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            {{ isEdit ? '更新' : '创建' }}
          </el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserForm',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const formRef = ref(null)
    const loading = ref(false)
    
    const form = reactive({
      username: '',
      realName: '',
      phone: '',
      email: '',
      role: 'manager',
      status: 'active',
      password: '',
      confirmPassword: '',
      idCard: '',
      gender: 'male',
      birthday: '',
      hireDate: '',
      address: '',
      remark: ''
    })
    
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (form.confirmPassword !== '') {
          formRef.value.validateField('confirmPassword')
        }
        callback()
      }
    }
    
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
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
      ],
      role: [
        { required: true, message: '请选择用户角色', trigger: 'change' }
      ],
      password: [
        { validator: validatePass, trigger: 'blur' }
      ],
      confirmPassword: [
        { validator: validatePass2, trigger: 'blur' }
      ],
      idCard: [
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
      ]
    }
    
    const isEdit = computed(() => {
      return route.params.id !== undefined
    })
    
    const getUser = (id) => {
      // 模拟获取用户数据
      const mockData = {
        id: id,
        username: 'manager1',
        realName: '张管家',
        phone: '13800138001',
        email: 'manager1@example.com',
        role: 'manager',
        status: 'active',
        idCard: '110101199001011234',
        gender: 'male',
        birthday: '1990-01-01',
        hireDate: '2024-01-01',
        address: '北京市朝阳区建国路88号',
        remark: '经验丰富的管家，工作认真负责。'
      }
      
      Object.assign(form, mockData)
    }
    
    const handleSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          
          // 模拟API调用
          setTimeout(() => {
            ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
            router.push('/user/list')
            loading.value = false
          }, 1000)
        }
      })
    }
    
    const handleCancel = () => {
      router.push('/user/list')
    }
    
    onMounted(() => {
      if (isEdit.value) {
        getUser(route.params.id)
      }
    })
    
    return {
      formRef,
      form,
      rules,
      loading,
      isEdit,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style> 