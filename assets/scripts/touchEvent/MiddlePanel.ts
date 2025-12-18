import { _decorator, Component, Node, EventTouch, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MiddlePanel')
export class MiddlePanel extends Component {
    @property(Label)
    infoLabel: Label = null;

    @property
    testMode: number = 0; // 0:正常, 1:停止传播, 2:立即停止传播

    private logInfo(message: string) {
        if (this.infoLabel) {
            this.infoLabel.string += message + '\n';
        }
        console.log(message);
    }

    start() {
        // 捕获阶段
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        
        // 冒泡阶段 - 注册多个监听器
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartBubble1, this);
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartBubble2, this);
    }

    onTouchStartCapture(event: EventTouch) {
        this.logInfo('【捕获】MiddlePanel 捕获阶段');
    }

    onTouchStartBubble1(event: EventTouch) {
        this.logInfo('【冒泡】MiddlePanel 冒泡阶段 - 监听器1');
        
        if (this.testMode === 1) {
            // 停止向父节点传播,但当前节点的其他监听器仍会执行
            event.propagationStopped = true;
            this.logInfo('  ✋ 执行 propagationStopped = true');
            this.logInfo('  → 阻止向父节点冒泡,但监听器2仍会执行');
        } else if (this.testMode === 2) {
            // 立即停止所有传播,当前节点的其他监听器也不会执行
            event.propagationImmediateStopped = true;
            this.logInfo('  ✋✋ 执行 propagationImmediateStopped = true');
            this.logInfo('  → 立即停止,监听器2不会执行');
        }
    }

    onTouchStartBubble2(event: EventTouch) {
        this.logInfo('【冒泡】MiddlePanel 冒泡阶段 - 监听器2');
        this.logInfo('  📢 如果看到这条,说明监听器1没有调用 propagationImmediateStopped');
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartCapture, this, true);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartBubble1, this);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStartBubble2, this);
    }
}