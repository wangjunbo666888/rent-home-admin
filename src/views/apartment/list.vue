<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="公寓名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
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
        新增
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
      <el-table-column align="center" label="ID" width="95">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="公寓名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="地址" width="200">
        <template #default="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '正常' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="房间数量" width="110" align="center">
        <template #default="scope">
          {{ scope.row.roomCount }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="200">
        <template #default="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
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
            type="success"
            @click="handleDetail(scope.row)"
          >
            详情
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
  name: 'ApartmentList',
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
      name: '',
      status: ''
    })
    
    const statusOptions = [
      { label: '正常', value: 'active' },
      { label: '停用', value: 'inactive' }
    ]
    
    // 模拟数据
    const mockData = [
      {
        id: 1,
        name: '阳光公寓',
        address: '北京市朝阳区建国路88号',
        status: 'active',
        roomCount: 12,
        createTime: '2024-01-15 10:30:00'
      },
      {
        id: 2,
        name: '翠湖公寓',
        address: '北京市海淀区中关村大街1号',
        status: 'active',
        roomCount: 8,
        createTime: '2024-01-10 14:20:00'
      }
    ]
    
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
      router.push('/apartment/create')
    }
    
    const handleUpdate = (row) => {
      router.push(`/apartment/edit/${row.id}`)
    }
    
    const handleDetail = (row) => {
      router.push(`/apartment/detail/${row.id}`)
    }
    
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该公寓吗？', '提示', {
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
      statusOptions,
      getList,
      handleFilter,
      handleCreate,
      handleUpdate,
      handleDetail,
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