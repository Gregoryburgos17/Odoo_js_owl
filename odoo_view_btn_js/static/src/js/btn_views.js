/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart, useRef } = owl;
import { useService } from "@web/core/utils/hooks";


export class Gbcontainer extends Component {
    setup(){
        this.state = useState({
            task:{name:"WORD", value:5,description:""},
            taskList:[],
            isEdit: false,
            activeId: false,
        })
        this.orm = useService("orm")
        this.model = "odoo_view_btn_js.odoo_view_btn_js"
        this.searchInput = useRef("search-input")

        onWillStart(async ()=>{
            await this.getAllTasks()
        })

    };
    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "value","description"])
    }
    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    }

    editTask(task){
        this.state.activeId = task.id
        this.state.isEdit = true
        this.state.task = {...task}
    }

    async saveTask(){

        if (!this.state.isEdit){
            await this.orm.create(this.model, [this.state.task])
            this.resetForm()
        } else {
            await this.orm.write(this.model, [this.state.activeId], this.state.task)
        }

        await this.getAllTasks()
    }

    resetForm(){
        this.state.task = {name:"", value:0}
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id])
        await this.getAllTasks()
    }

    async searchTasks(){
        const text = this.searchInput.el.value
        this.state.taskList = await this.orm.searchRead(this.model, [['name','ilike',text]], ["name", "value","description"])
    }

    async toggleTask(e, task){
        await this.orm.write(this.model, [task.id], {description: e.target.checked})
        await this.getAllTasks()
    }

    async updateValue(e, task){
        await this.orm.write(this.model, [task.id], {value: e.target.value})
        await this.getAllTasks()
    }


}
Gbcontainer.template = 'odoo_view_btn_js.TodoList'
registry.category('actions').add('odoo_view_btn_js.action_owl_todo_list_js', Gbcontainer);