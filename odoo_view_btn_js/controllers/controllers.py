# -*- coding: utf-8 -*-
from odoo import http


class OdooViewBtnJs(http.Controller):
    @http.route('/odoo_view_btn_js/odoo_view_btn_js', auth='public')
    def index(self, **kw):
        return "Hello, world"

    @http.route('/odoo_view_btn_js/odoo_view_btn_js/objects', auth='public')
    def list(self, **kw):
        return http.request.render('odoo_view_btn_js.listing', {
            'root': '/odoo_view_btn_js/odoo_view_btn_js',
            'objects': http.request.env['odoo_view_btn_js.odoo_view_btn_js'].search([]),
        })

    @http.route('/odoo_view_btn_js/odoo_view_btn_js/objects/<model("odoo_view_btn_js.odoo_view_btn_js"):obj>', auth='public')
    def object(self, obj, **kw):
        return http.request.render('odoo_view_btn_js.object', {
            'object': obj
        })
