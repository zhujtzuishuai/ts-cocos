
// Scene
// └── Canvas
//     ├── Background (Sprite, 蓝色背景)
//     │   └── MiddlePanel (Sprite, 绿色面板)
//     │       └── Button (Sprite, 红色按钮)
//     └── InfoLabel (Label, 显示事件信息)



import { _decorator, Component, Node, EventTouch, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {
    @property(Label)
    infoLabel: Label = null;

    private logInfo(message: string) {
        if (this.infoLabel) {
            this.infoLabel.string += message + '\n';
        }
        console.log(message);
    }

    start() {
        // 注册捕获阶段事件 (第三个参数为true表示捕获阶段)
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        
        // 注册冒泡阶段事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartBubble, this);
    }

    onTouchStartCapture(event: EventTouch) {
        this.logInfo('【捕获】Background 捕获阶段');
        
        // 可以在捕获阶段就停止传播
        // event.propagationStopped = true; // 阻止继续向下捕获和后续冒泡
    }

    onTouchStartBubble(event: EventTouch) {
        this.logInfo('【冒泡】Background 冒泡阶段');
        this.logInfo(`  - bubbles: ${event.bubbles}`);
        this.logInfo(`  - propagationStopped: ${event.propagationStopped}`);
        this.logInfo(`  - propagationImmediateStopped: ${event.propagationImmediateStopped}`);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartBubble, this);
    }
}