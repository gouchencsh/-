<script setup>
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import nvzhuang from '../assets/cover/nvzhuang.jpg'
import jiadian from '../assets/cover/jiadian.jpg'
import meizhuang from '../assets/cover/meizhuang.jpg'
import nanzhuang from '../assets/cover/nanzhuang.jpg'
import phone from '../assets/cover/phone.jpg'
import shoe from '../assets/cover/shoe.jpg'
import request from '../api/request'
const AllType = ref([]) //所有商品分类原数据
const AllGoods = ref([]) //所有商品分类原数据
let filteredGoods = ref([])
const commodityDTO = reactive({})
onMounted(async () => {
    // 获取商品分类数据
    await getType()
    await getAllGoods()
    filter()
})
async function getType() {//获取种类
    let { data } = await request.get("/reception/commodityType_user")
    console.log(data)
    AllType.value = data
}
async function getAllGoods() {//获取所有商品
    let { data } = await request.post("/reception/getCommodity", commodityDTO)
    console.log(data)
    AllGoods.value = data
}
const route = useRoute()
const router = useRouter()
let id = ref(route.query.id)
let cid = route.query.cid

function filter() {
    if (cid) {
        // 有 cid 时直接过滤
        filteredGoods.value = AllGoods.value.filter(goods => goods.typeId == cid)
    } else {
        // 无 cid 时，先找到 id 对应的 children 的 typeId
        let alternateId = []
        const targetType = AllType.value.find(typeItem => typeItem.id == id.value)
        if (targetType) {
            alternateId = targetType.children.map(child => child.id)
        }
        // 使用过滤方式获取符合条件的商品
        filteredGoods.value = AllGoods.value.filter(goods => alternateId.includes(goods.typeId))
    }
    console.log(filteredGoods.value)
}

// 根据 categoryId 动态图片封面
let bannerImage = computed(() => {
    switch (parseInt(id.value)) {
        case 20:
            return nvzhuang // 女性专场图片
        case 22:
            return nanzhuang    // 男性专场图片
        case 32:
            return jiadian // 家电专场图片
        case 40:
            return shoe   // 鞋类专场图片
        case 68:
            return phone   // 手机专场图片
        case 69:
            return meizhuang // 化妆品专场图片
        default:
            return nvzhuang  // 默认图片
    }
})
function handleImageClick(item) {
    router.push({
        path: '/deta',
        query: {
            id: item
        }
    })
}
watch(
    () => route.query.cid,
    (newCid) => {
        cid = newCid
        filter() // 重新筛选商品
    }
)

watch(
    () => route.query.id,
    (newId) => {
        id.value = newId

        filter() // 重新筛选商品
    }
)
function updateCid(newCid) {
    router.push({
        query: {
            ...route.query,
            cid: newCid
        }
    })
}



</script>
<template>
    <div class="back">
        <div>
            <img :src="bannerImage" alt="专场图片" class="banner-image" />
        </div>
        <div class="classification">
            <div class="pinlei">品类:</div>
            <div v-for="category in AllType" :key="category.id" v-show="category.id == id" class="classification-radio">
                <div v-for="subcategory in category.children" :key="subcategory.id" class="classification-radio-group">
                    <input type="radio" name="category" :value="subcategory.id" @change="updateCid(subcategory.id)"
                        v-model="cid">
                    <label>{{ subcategory.typeName }}</label>
                </div>
            </div>
            <div class="gengduo">更多</div>
        </div>
        <div class="sort">
            <div class="sort-elm">综合</div>
            <div class="sort-elm">销量</div>
            <div class="sort-elm">价格^</div>
            <div class="sort-elm">折扣</div>
        </div>

        <div class="recommend_img">
            <el-row :gutter="0">
                <el-col :span="6" v-for="(item, index) in filteredGoods" :key="index">
                    <el-card shadow="always" class="cardStyle" align="middle">
                        <div @click="handleImageClick(item.id)">
                            <el-image :src="item.coverImg" class="goodsimg"></el-image>
                            <p class="paa-spacing">{{ item.commodityName }}</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>


<style scoped>
.goodsimg {
    width: 200px;
    height: 200px;
    align-items: center;
}

.cardStyle {
    justify-content: center;
}

.back {
    background-image: url('../assets/bg011.png');
    background-size: cover;
}

.banner-image {
    height: 500px;
    width: 1300px;
    display: block;
    /* 确保图片被视为块级元素 */
    margin: 0 auto;
    /* 让图片水平居中 */
}

.classification {
    width: 1300px;
    margin-top: 1px;
    margin-left: 110px;
    border: solid 1px;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
}

.pinlei {
    margin-left: 30px;
    font-weight: 800;
}

.classification-radio {
    margin-left: 35px;
}

.classification-radio-group {
    display: inline-block;
    margin-right: 10px;
}

.gengduo {
    margin-left: 450px;
    font-weight: 650;
}

.sort {
    width: 1300px;
    margin-top: 20px;
    margin-left: 110px;
    height: 35px;
    background-color: #393939;
    display: flex;
    align-items: center;
}

.sort-elm {
    width: 50px;
    margin-left: 25px;
    color: white;
}

.recommend_img {
    margin: 0 auto;
    margin-top: 10px;
    width: 1310px;
    height: auto;
    display: flex;
    opacity: 0.95;
    flex-wrap: wrap;
    background-color: #ffffff;

}
</style>
