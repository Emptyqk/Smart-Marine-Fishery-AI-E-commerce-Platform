<script setup>
import { onMounted, ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartstore';
import { getCheckoutAPI,createOrderAPI,addAddressAPI,deleteAddressAPI,editAddressAPI } from '@/apis/checkout';
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()
const checkInfo = ref({})  // 订单对象
const curAddress = ref({})
const cartStore = useCartStore()
const getCheckout = async()=>{
    const res = await getCheckoutAPI()
    checkInfo.value = res.data.result
    curAddress.value = res.data.result.userAddresses.find(item=>item.isDefault === 1)
}
onMounted(()=>{
    getCheckout()
})
const showDialog = ref(false)

const activeAddress= ref({})
const switchAddress = (item)=>{
    activeAddress.value = item
}

const confirm = () =>{
    curAddress.value = activeAddress.value
    showDialog.value = false
}


const createOrder = async () => { 
  const res = await createOrderAPI({
    deliveryTimeType:1,
    payChannel:1,
    buyerMessage:"",
    goods:checkInfo.value.goods.map(item=>{
      return {
        skuId:item.skuId,
        count:item.count,
      }
    }),
    addressId:curAddress.value.id
  })
  const orderId = res.data.result.id
  router.push({
    path: 'pay',
    query: {
      id:orderId
    }
  })
  ,
  cartStore.updateCartList()
}
console.log(curAddress)

const changeFlag = ref(false)
const form = reactive({
  receiver: "",
  contact: "",
  provinceCode: "",
  cityCode: "",
  countyCode: "",
  address: "",
  postalCode: "",
  addressTags: "", // 多个标签用逗号分隔，如："家里,公司"
  isDefault: 1, // 注意：文档说明 0是默认，1不是
  fullLocation: ""
})

const addAddress = async()=>{
  if(!form.receiver.trim()){
    ElMessage.error('请填写收货人信息')
    return
  }if (!form.contact.trim()) {
      ElMessage.error('请输入联系方式')
      return
    }
    if (!form.address.trim()) {
      ElMessage.error('请输入详细地址')
      return
    }
    if(isEdit.value){
      await editAddressAPI(editId.value,form)
      ElMessage.success('修改成功')
    }else{
      await addAddressAPI(form)
      ElMessage.success('添加成功')
    }
    changeFlag.value = false
    isEdit.value = false
    editId.value = null
    resetForm()
    await getCheckout()
}

const resetForm = ()=>{
  Object.keys(form).forEach(key=>{
      if(key === "isDefault"){
        form[key] = 1
      }else{
        form[key] = ""
      }
    })
}

const deleteAddress = async(id)=>{
  await deleteAddressAPI(id)
  ElMessage.success('删除成功')
  await getCheckout()
}

const showDeleteDialog = (item)=>{
  ElMessageBox.confirm(
    `确定要删除${item.receiver}-${item.address}吗？`,
    '删除确定',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async() => {
      await deleteAddress(item.id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const isEdit = ref(false)
const editId = ref(null)
const editAddress = async(item)=>{
  await editAddressAPI(item.id,form)
  ElMessage.success('修改成功')
  await getCheckout()
}
const showEditDialog = (item)=>{ 
  isEdit.value = true
  editId.value = item.id
  changeFlag.value = true
  Object.keys(form).forEach(key=>{
    form[key] = item[key]

  })
} 

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large"  @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="changeFlag = true;resetForm()">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
<el-dialog v-model="showDialog" title="切换收货地址" width="30%" center @close="resetForm">
  <div class="addressWrapper">
    <div 
      class="text item" 
      v-for="item in checkInfo.userAddresses"  
      :class="{active:activeAddress.id === item.id}" 
      @click="switchAddress(item)"  
      :key="item.id"
    >
      <div class="address-content">
        <div class="address-header">
          <div class="address-header-left">
            <span class="address-tags">{{ item.addressTags }}</span>
            <span v-if="item.isDefault===0" class="default-tag">默认</span>
          </div>
          <el-button
            type="danger" 
            size="small" 
            @click.stop="showDeleteDialog(item)" 
            class="delete-btn">
            删除
          </el-button>
          <el-button type="primary" size="small" @click.stop="showEditDialog(item)" class="edit-btn">修改</el-button>

        </div>
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </template>
</el-dialog>
  <!-- 添加地址 -->
   <el-dialog v-model="changeFlag" title="添加收货地址" width="30%" center @close="resetForm">
     <el-form :model="form" label-width="100px">
        <el-form-item label="收货人">
          <el-input v-model="form.receiver" />
        </el-form-item>
         <el-form-item label="联系方式">
        <el-input v-model="form.contact" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="省份编码">
          <el-input v-model="form.provinceCode" placeholder="请输入省份编码" />
        </el-form-item>
        <el-form-item label="城市编码">
          <el-input v-model="form.cityCode" placeholder="请输入城市编码" />
        </el-form-item>
        <el-form-item label="地区编码">
          <el-input v-model="form.countyCode" placeholder="请输入地区编码" />
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="form.postalCode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="地址标签">
          <el-input v-model="form.addressTags" placeholder="如：家里,公司" />
        </el-form-item>
        <el-form-item label="完整地址">
          <el-input 
            v-model="form.address" 
            placeholder="如：山东省 青岛市 黄岛区"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="是否默认地址"> 
          <el-radio-group v-model="form.isDefault">
            <el-radio :label="1" >是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="changeFlag=false">取消</el-button>
            <el-button type="primary" @click="addAddress">确定</el-button>
          </span>
        </template>
   </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0 10px;
  
  .default-tag {
    background-color: $xtxColor;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  .delete-btn {
    margin-left: auto;
    margin-right: 10px;
  }
  .edit-btn { 
    margin-left: auto;
    margin-right: 10px;
  }
}

.text.item {
  position: relative;
  border: 1px solid #f5f5f5;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 0;
  
  &.active,
  &:hover {
    border-color: $xtxColor;
    background: lighten($xtxColor, 50%);
  }
  
  &:hover {
    .delete-btn {
      opacity: 1;
      visibility: visible;
    }
  }
}

.address-content {
  padding: 15px;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  min-height: 28px;
}

.address-header-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.address-tags {
  color: #666;
  font-size: 12px;
}

.default-tag {
  background-color: $xtxColor;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  height: 20px;
  line-height: 16px;
  display: inline-block;
}

.delete-btn {
  flex-shrink: 0;
  /* 如果需要悬停效果 */
  /* opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease; */
}

.text.item {
  border: 1px solid #f5f5f5;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &.active,
  &:hover {
    border-color: $xtxColor;
    background: lighten($xtxColor, 50%);
  }
  
  /* 如果需要悬停显示删除按钮 */
  /* &:hover .delete-btn {
    opacity: 1;
    visibility: visible;
  } */
}

.text.item ul {
  padding: 0;
  margin: 0;
}

.text.item li {
  list-style: none;
  line-height: 24px;
  font-size: 14px;
}

.text.item li span {
  color: #999;
  margin-right: 5px;
  
  > i {
    width: 0.5em;
    display: inline-block;
  }
}
</style>