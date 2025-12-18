import { _decorator, Component, Node, Label, Button as CCButton } from 'cc';
import { Button } from './Button';
import { MiddlePanel } from './MiddlePanel';
const { ccclass, property } = _decorator;

@ccclass('TestController')
export class TestController extends Component {
    @property(Node)
    buttonNode: Node = null;

    @property(Node)
    middlePanelNode: Node = null;

    @property(Label)
    statusLabel: Label = null;

    start() {
        this.updateStatus();
    }

    // 切换按钮的吞噬状态
    onToggleSwallow() {
        const buttonScript = this.buttonNode.getComponent(Button);
        if (buttonScript) {
            buttonScript.swallowTouches = !buttonScript.swallowTouches;
            this.updateStatus();
        }
    }

    // 切换中间面板的测试模式
    onToggleMode() {
        const panelScript = this.middlePanelNode.getComponent(MiddlePanel);
        if (panelScript) {
            panelScript.testMode = (panelScript.testMode + 1) % 3;
            this.updateStatus();
        }
    }

    private updateStatus() {
        const buttonScript = this.buttonNode.getComponent(Button);
        const panelScript = this.middlePanelNode.getComponent(MiddlePanel);
        
        const modeNames = ['正常传播', '停止冒泡', '立即停止'];
        
        this.statusLabel.string = 
            `按钮吞噬: ${buttonScript.swallowTouches ? 'ON' : 'OFF'}\n` +
            `面板模式: ${modeNames[panelScript.testMode]}`;
    }
}