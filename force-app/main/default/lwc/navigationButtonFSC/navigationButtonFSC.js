import {api, LightningElement} from 'lwc';
import {FlowNavigationBackEvent, FlowNavigationFinishEvent, FlowNavigationNextEvent, FlowNavigationPauseEvent, FlowAttributeChangeEvent} from 'lightning/flowSupport';

export default class NavigationButtonFsc extends LightningElement {
    @api label;
    @api variant;
    @api type;
    @api disabled;
    @api iconName;
    @api iconPosition;
    @api classes;
    
    _innerValue;
    
    @api 
    set innerValue(value) {
        this._innerValue = value;
        this.dispatchEvent(new FlowAttributeChangeEvent('innerValue', value));
    }
    
    get innerValue() {
        return this._innerValue;
    }

    @api availableActions = [];

    handleClick() {
        const isActionAvailable = (navigationEvent) => {
            return this.availableActions.find((action) => action === navigationEvent);
        };
        
        this.innerValue = this.label;

        switch (this.type) {
            case 'NEXT':
                if (isActionAvailable('NEXT')) {
                    this.dispatchEvent(new FlowNavigationNextEvent());
                }
                break;
            case 'BACK':
                if (isActionAvailable('BACK')) {
                    this.dispatchEvent(new FlowNavigationBackEvent());
                }
                break;
            case 'FINISH':
                if (isActionAvailable('FINISH')) {
                    this.dispatchEvent(new FlowNavigationFinishEvent());
                }
                break;
            case 'PAUSE':
                if (isActionAvailable('PAUSE')) {
                    this.dispatchEvent(new FlowNavigationPauseEvent());
                }
                break;
            default:
                console.error('Unknown navigation button type');
        }
    }
}