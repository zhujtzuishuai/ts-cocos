import { _decorator, Component, Node, EventTouch, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Button')
export class Button extends Component {
    @property(Label)
    infoLabel: Label = null;

    @property
    swallowTouches: boolean = false; // 是否吞噬触摸

    private logInfo(message: string) {
        if (this.infoLabel) {
            this.infoLabel.string = ''; // 清空之前的日志
            this.infoLabel.string += '=== 触摸事件流程 ===\n';
            this.infoLabel.string += message + '\n';
        }
        console.log(message);
    }

    start() {
        // 捕获阶段
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        
        // 目标阶段/冒泡阶段
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartTarget, this);
    }

    onTouchStartCapture(event: EventTouch) {
        this.logInfo('【捕获】Button 捕获阶段(目标节点)');
    }

    onTouchStartTarget(event: EventTouch) {
        this.logInfo('【目标】Button 目标阶段');
        
        if (this.swallowTouches) {
            // 吞噬触摸事件,阻止事件继续传播
            event.propagationStopped = true;
            this.logInfo('  🚫 吞噬触摸: propagationStopped = true');
            this.logInfo('  → 事件不会向父节点冒泡');
        } else {
            this.logInfo('  ✅ 允许冒泡到父节点');
        }
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartTarget, this);
    }
}