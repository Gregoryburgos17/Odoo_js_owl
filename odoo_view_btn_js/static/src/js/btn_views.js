/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart, useRef } = owl;
import { useService } from "@web/core/utils/hooks";


export class Gbcontainer extends Component {
    setup(){
        this.state = useState({
            task:{name:"WORD", value:5},
            // taskList:[],
            // isEdit: false,
            // activeId: false,
        })

    };

}
Gbcontainer.template = 'odoo_view_btn_js.TodoList'
registry.category('actions').add('odoo_view_btn_js.action_owl_todo_list_js', Gbcontainer);