<template>
    <div class="left">
        <el-tabs v-model="activeLabelName">
            <el-tab-pane v-for="(item, index) in labelStructure" :key="`${index}-${item.value}`" :label="item.label" :name="`${index}-${item.value}`">
                <component :is="`left.${item.value}`" :renderList="item.renderList" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
import Element from '@/plugins/element';
@Options({
    name: 'right',
    components: {}
})
export default class App extends mixins() {
    // 结构标签
    labelStructure = [
        {
            label: '基础元件',
            value: 'baseElement',
            renderList: [
                {
                    name: '相机',
                    icon: 'el-icon-camera-solid',
                    children: [{ type: 'perspectiveCamera', name: '透视相机' }]
                },
                {
                    name: '光源',
                    icon: 'el-icon-sunrise-1',
                    children: [
                        { type: 'directionalLight', name: '平行光' },
                        { type: 'ambientLight', name: '环境光' },
                        { type: 'pointLight', name: '点光源' },
                        { type: 'spotLight', name: '聚光灯' }
                    ]
                }
            ]
        },
        {
            label: '模型库',
            value: 'baseElement',
            renderList: [
                {
                    name: '人物',
                    icon: 'el-icon-s-custom',
                    param: {
                        modelType: 'character'
                    },
                    importTitle: '本地导入',
                    import: (item) => {
                        let el = document.createElement('input');
                        el.setAttribute('type', 'file');
                        el.setAttribute('directory', 'true');
                        el.setAttribute('webkitdirectory', 'true');
                        el.onchange = function () {
                            new Element['mmd']().example({ param: '223.pmx', loadType: 'blob', resource: Array.from(el.files), ...item.param });
                        };
                        el.click();
                    },
                    children: [
                        { type: 'mmd', name: '莱因哈特', param: { url: 'http://www.jousenzhou.xyz:3000/mmdModel/Reinhardt.pmx' } },
                        { type: 'mmd', name: 'xx', param: 'http://www.jousenzhou.xyz:3000/ThreeJs_MMD/obj/model/MIKU_ by_ KiraKoTova.pmx' },
                        { type: 'mmd', name: '初音未来', param: { url: 'http://www.jousenzhou.xyz:3000/miku/miku.pmx' } },
                        { type: 'mmd', name: '测试模型1', param: 'http://www.jousenzhou.xyz:3000/fantasy/fantasy.pmx' },
                        { type: 'mmd', name: '测试模型2', param: 'http://www.jousenzhou.xyz:3000/model/wgsmiku/Sour Classic Miku.pmx' },
                        { type: 'mmd', name: '测试模型3', param: 'http://www.jousenzhou.xyz:3000/model/Deep Sea/Deep Sea Girl.pmx' },
                        {
                            type: 'mmd',
                            name: '测试模型4',
                            param: 'http://www.jousenzhou.xyz:3000/model/TDA High Princess Haku/TDA High Princess Haku Ver.1.02.pmx'
                        },
                        { type: 'mmd', name: '测试模型5', param: 'http://www.jousenzhou.xyz:3000/model/TDA Miku Night  Winter/MIKU402 (1).pmx' },
                        { type: 'mmd', name: '测试模型6', param: 'http://www.jousenzhou.xyz:3000/model/TDA Angel Miku/Miku.pmx' },
                        { type: 'mmd', name: '测试模型7', param: 'http://www.jousenzhou.xyz:3000/model/TDA Angel Miku/Miku (with wings and buns).pmx' },
                        { type: 'mmd', name: '测试模型8', param: 'http://www.jousenzhou.xyz:3000/model/律化鸭/重装小兔摩托.pmx' },
                        { type: 'mmd', name: '测试模型9', param: 'http://www.jousenzhou.xyz:3000/model/律化鸭/律化鸭配布版.pmx' },
                        { type: 'mmd', name: '测试模型10', param: 'http://www.jousenzhou.xyz:3000/model/496/Bikini Haku.pmx' },
                        { type: 'mmd', name: '测试模型11', param: 'http://www.jousenzhou.xyz:3000/model/Ocean Party Miku/Hatsune Miku Update v2.0.pmx' }
                    ]
                },
                {
                    name: '场景',
                    icon: 'el-icon-s-custom',
                    param: {
                        modelType: 'scene'
                    },
                    children: [
                        { type: 'mmd', name: '共鸣', param: { url: 'http://www.jousenzhou.xyz:3000/mikuScene/椛暗式/椛暗式-共鳴ver1.1.pmx' } },
                        { type: 'mmd', name: '场景模型2', param: 'http://www.jousenzhou.xyz:3000/ThreeJs_MMD/scene/123.pmx' },
                        { type: 'mmd', name: '场景模型3', param: 'http://www.jousenzhou.xyz:3000/mikuScene/lottery/Friendship prize pool.pmx' },
                        { type: 'mmd', name: '场景模型4', param: 'http://www.jousenzhou.xyz:3000/mikuScene/草木が緑/草木が緑.pmx' },
                        { type: 'mmd', name: '场景模型5', param: 'http://www.jousenzhou.xyz:3000/mikuScene/番傘と明かり配布用/bg.pmx' },
                        { type: 'mmd', name: '场景模型6', param: 'http://www.jousenzhou.xyz:3000/mikuScene/XM H3stage/崩坏3天命总部部分.pmx' },
                        { type: 'mmd', name: '场景模型7', param: 'http://www.jousenzhou.xyz:3000/mikuScene/桃の花ステージ【配布】/桃の花ステージ.pmx' }
                    ]
                }
            ]
        }
        // { label: '插件', value: 'plugins' }
    ];
    // 当前激活的标签
    activeLabelName = `${0}-${this.labelStructure[0].value}`;
}
</script>
<style lang="scss" scoped>
.left {
    color: white;
    ::v-deep .el-tabs {
        margin: 8px;
        height: calc(100% - 16px);
        display: flex;
        flex-direction: column;
        .el-tabs__header {
            margin: 0;
            .el-tabs__nav {
                width: 100%;
                display: flex;
                .el-tabs__item {
                    height: 30px;
                    line-height: 30px;
                    flex: 1;
                    padding: 0;
                    text-align: center;
                    font-size: 12px;
                    background: #281928;
                    color: white;
                    &:nth-of-type(n + 3) {
                        border-left: 1px solid black;
                    }
                }
                .is-active {
                    color: #f300ff !important;
                }
                .el-tabs__active-bar {
                    background: rgba(243, 0, 255, 0.65);
                }
            }
        }
        .el-tabs__content {
            flex: 1;
            margin-top: 8px;
            overflow: hidden;
            .el-tab-pane {
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
