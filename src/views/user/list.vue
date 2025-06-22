<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        placeholder="用户名"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-input
        v-model="listQuery.realName"
        placeholder="真实姓名"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-select
        v-model="listQuery.role"
        placeholder="用户角色"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        placeholder="状态"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="Search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="Plus"
        @click="handleCreate"
      >
        新增用户
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="80">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="120">
        <template #default="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="120">
        <template #default="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="130">
        <template #default="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template #default="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="100" align="center">
        <template #default="scope">
          <el-tag :type="getRoleType(scope.row.role)">
            {{ getRoleLabel(scope.row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最后登录" width="180">
        <template #default="scope">
          {{ scope.row.lastLoginTime || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template #default="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleResetPassword(scope.row)"
          >
            重置密码
          </el-button>
          <el-button
            size="small"
            :type="scope.row.status === 'active' ? 'danger' : 'success'"
            @click="handleToggleStatus(scope.row)"
          >
            {{ scope.row.status === 'active' ? '禁用' : '启用' }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination/index.vue'

export default {
  name: 'UserList',
  components: {
    Pagination
  },
  setup() {
    const router = useRouter()
    
    const listLoading = ref(true)
    const list = ref([])
    const total = ref(0)
    
    const listQuery = reactive({
      page: 1,
      limit: 20,
      username: '',
      realName: '',
      role: '',
      status: ''
    })
    
    const roleOptions = [
      { label: '超级管理员', value: 'admin' },
      { label: '管家', value: 'manager' },
      { label: '普通用户', value: 'user' }
    ]
    
    const statusOptions = [
      { label: '正常', value: 'active' },
      { label: '禁用', value: 'inactive' }
    ]
    
    // 模拟数据
    const mockData = [
      {
        id: 1,
        username: 'admin',
        realName: '系统管理员',
        phone: '13800138000',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
        lastLoginTime: '2024-01-20 15:30:00',
        createTime: '2024-01-01 10:00:00'
      },
      {
        id: 2,
        username: 'manager1',
        realName: '张管家',
        phone: '13800138001',
        email: 'manager1@example.com',
        role: 'manager',
        status: 'active',
        lastLoginTime: '2024-01-19 14:20:00',
        createTime: '2024-01-05 09:30:00'
      },
      {
        id: 3,
        username: 'manager2',
        realName: '李管家',
        phone: '13800138002',
        email: 'manager2@example.com',
        role: 'manager',
        status: 'active',
        lastLoginTime: '2024-01-18 16:45:00',
        createTime: '2024-01-10 11:15:00'
      }
    ]
    
    const getRoleType = (role) => {
      const roleMap = {
        admin: 'danger',
        manager: 'warning',
        user: 'info'
      }
      return roleMap[role] || 'info'
    }
    
    const getRoleLabel = (role) => {
      const roleMap = {
        admin: '超级管理员',
        manager: '管家',
        user: '普通用户'
      }
      return roleMap[role] || role
    }
    
    const getList = () => {
      listLoading.value = true
      // 模拟API调用
      setTimeout(() => {
        list.value = mockData
        total.value = mockData.length
        listLoading.value = false
      }, 1000)
    }
    
    const handleFilter = () => {
      listQuery.page = 1
      getList()
    }
    
    const handleCreate = () => {
      router.push('/user/create')
    }
    
    const handleUpdate = (row) => {
      router.push(`/user/edit/${row.id}`)
    }
    
    const handleResetPassword = (row) => {
      ElMessageBox.confirm(`确认重置用户 ${row.username} 的密码吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ElMessage.success('密码重置成功，新密码已发送到用户邮箱')
      })
    }
    
    const handleToggleStatus = (row) => {
      const action = row.status === 'active' ? '禁用' : '启用'
      ElMessageBox.confirm(`确认${action}用户 ${row.username} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.status = row.status === 'active' ? 'inactive' : 'active'
        ElMessage.success(`${action}成功`)
      })
    }
    
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该用户吗？删除后无法恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ElMessage.success('删除成功')
        getList()
      })
    }
    
    onMounted(() => {
      getList()
    })
    
    return {
      listLoading,
      list,
      total,
      listQuery,
      roleOptions,
      statusOptions,
      getRoleType,
      getRoleLabel,
      getList,
      handleFilter,
      handleCreate,
      handleUpdate,
      handleResetPassword,
      handleToggleStatus,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.filter-container {
  padding-bottom: 10px;
  
  .filter-item {
    margin-right: 10px;
  }
}
</style> 