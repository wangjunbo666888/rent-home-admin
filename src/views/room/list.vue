<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.roomNumber"
        placeholder="房间号"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-select
        v-model="listQuery.apartmentId"
        placeholder="所属公寓"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="apartment in apartmentOptions"
          :key="apartment.id"
          :label="apartment.name"
          :value="apartment.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        placeholder="房间状态"
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
        新增房间
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
      <el-table-column label="房间号" width="100">
        <template #default="scope">
          {{ scope.row.roomNumber }}
        </template>
      </el-table-column>
      <el-table-column label="所属公寓" width="150">
        <template #default="scope">
          {{ scope.row.apartmentName }}
        </template>
      </el-table-column>
      <el-table-column label="房间类型" width="120">
        <template #default="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="面积" width="100" align="center">
        <template #default="scope">
          {{ scope.row.area }}㎡
        </template>
      </el-table-column>
      <el-table-column label="租金" width="120" align="center">
        <template #default="scope">
          ¥{{ scope.row.price }}/月
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="租客" width="120">
        <template #default="scope">
          {{ scope.row.tenant || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="租期" width="200">
        <template #default="scope">
          <span v-if="scope.row.rentStartDate && scope.row.rentEndDate">
            {{ scope.row.rentStartDate }} 至 {{ scope.row.rentEndDate }}
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
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
  name: 'RoomList',
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
      roomNumber: '',
      apartmentId: '',
      status: ''
    })
    
    const statusOptions = [
      { label: '空置', value: 'vacant' },
      { label: '已租', value: 'rented' },
      { label: '维护中', value: 'maintenance' },
      { label: '已预订', value: 'reserved' }
    ]
    
    const apartmentOptions = [
      { id: 1, name: '阳光公寓' },
      { id: 2, name: '翠湖公寓' },
      { id: 3, name: '海景花园' }
    ]
    
    // 模拟数据
    const mockData = [
      {
        id: 1,
        roomNumber: '101',
        apartmentId: 1,
        apartmentName: '阳光公寓',
        type: '一室一厅',
        area: 45,
        price: 3500,
        status: 'rented',
        tenant: '张三',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-12-31'
      },
      {
        id: 2,
        roomNumber: '102',
        apartmentId: 1,
        apartmentName: '阳光公寓',
        type: '两室一厅',
        area: 65,
        price: 4800,
        status: 'vacant',
        tenant: '',
        rentStartDate: '',
        rentEndDate: ''
      },
      {
        id: 3,
        roomNumber: '201',
        apartmentId: 2,
        apartmentName: '翠湖公寓',
        type: '一室一厅',
        area: 50,
        price: 3800,
        status: 'rented',
        tenant: '李四',
        rentStartDate: '2024-01-15',
        rentEndDate: '2024-12-31'
      }
    ]
    
    const getStatusType = (status) => {
      const statusMap = {
        vacant: 'info',
        rented: 'success',
        maintenance: 'warning',
        reserved: 'primary'
      }
      return statusMap[status] || 'info'
    }
    
    const getStatusLabel = (status) => {
      const statusMap = {
        vacant: '空置',
        rented: '已租',
        maintenance: '维护中',
        reserved: '已预订'
      }
      return statusMap[status] || status
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
      router.push('/room/create')
    }
    
    const handleUpdate = (row) => {
      router.push(`/room/edit/${row.id}`)
    }
    
    const handleDetail = (row) => {
      router.push(`/room/detail/${row.id}`)
    }
    
    const handleDelete = (row) => {
      ElMessageBox.confirm('确认删除该房间吗？', '提示', {
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
      apartmentOptions,
      getStatusType,
      getStatusLabel,
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