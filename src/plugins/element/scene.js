let { THREE } = window;
import { proxy } from '../until';
import { elementExample } from './index';
export default class {
    scene = '';
    proxy = '';
    constructor() {
        // 注册场景
        let scene = new THREE.Scene();
        // 劫持做数据映射[单向流] 映射对象到scene
        let hijack = proxy(
            {
                // false | fog | fogExp2
                enabled: false,
                // 雾 (远近)
                fog: {
                    color: 'rgba(255,255,255,1)',
                    near: 0.015,
                    far: 100
                },
                // 雾 (浓度)
                fogExp2: {
                    color: 'rgba(255,255,255,1)',
                    concentration: 0.01
                }
            },
            // controlType 操作类型(create delete modify)
            (controlType, { target, key, value, parentKey }) => {
                if (key === 'enabled') {
                    if (value === false) {
                        scene.fog = null;
                    } else if (value === 'fog') {
                        let { color, near, far } = hijack.fog;
                        scene.fog = new THREE.Fog(new THREE.Color(color), near, far);
                    } else if (value === 'fogExp2') {
                        let { color, concentration } = hijack.fogExp2;
                        scene.fog = new THREE.FogExp2(new THREE.Color(color), concentration);
                    }
                } else if (parentKey.includes('fog')) {
                    target[key] = value;
                    let { color, near, far } = target;
                    scene.fog = new THREE.Fog(new THREE.Color(color), near, far);
                } else if (parentKey.includes('fogExp2')) {
                    target[key] = value;
                    let { color, concentration } = target;
                    scene.fog = new THREE.FogExp2(new THREE.Color(color), concentration);
                }
            }
        );
        this.scene = scene;
        this.proxy = hijack;
    }
    example(example) {
        let object = { name: '场景', type: 'scene', uuid: 'scene', value: this.scene, proxy: this.proxy };
        elementExample(example, object, 'base', true);
    }
}
