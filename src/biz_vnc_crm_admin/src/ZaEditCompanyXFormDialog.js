/*
##############################################################################
#    VNC-Virtual Network Consult GmbH.
#    Copyright (C) 2004-TODAY VNC-Virtual Network Consult GmbH
#    (<http://www.vnc.biz>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
*/

var ZaEditCompanyXFormDialog = function(parent, app, w, h, title) {
    if (arguments.length == 0) return;
    this._standardButtons = [DwtDialog.OK_BUTTON, DwtDialog.CANCEL_BUTTON];
    ZaXDialog.call(this, parent, app, title, w, h, "ZaEditCompanyXFormDialog");
    this._containedObject = {};
    this.initForm(ZaCRMadmin.companyList, this.getMyXForm());
}

ZaEditCompanyXFormDialog.prototype = new ZaXDialog;
ZaEditCompanyXFormDialog.prototype.constructor = ZaEditCompanyXFormDialog;

ZaEditCompanyXFormDialog.prototype.getMyXForm = function () {
    var xFormObject = {
        numCols: 1,
        items: [{
            type: _ZAWIZGROUP_,
            items: [
            {
                ref: ZaCRMadmin.A_companyName,
                type: _TEXTFIELD_,
                label: biz_vnc_crm_admin.HDR_name + ":",
                labelLocation: _LEFT_,
                width: 250
            }, {
                ref: ZaCRMadmin.A_companyAddress,
                type: _TEXTFIELD_,
                label: biz_vnc_crm_admin.HDR_address + ":",
                labelLocation: _LEFT_,
                width: 250
            }, {
                ref: ZaCRMadmin.A_companyPhone,
                type: _TEXTFIELD_,
                label: biz_vnc_crm_admin.HDR_phone + ":",
                labelLocation: _LEFT_,
                width: 250
            }, {
                ref: ZaCRMadmin.A_companyFax,
                type: _TEXTFIELD_,
                label: biz_vnc_crm_admin.HDR_fax + ":",
                labelLocation: _LEFT_,
                width: 250
            }, {
                ref: ZaCRMadmin.A_companyEmail,
                type: _TEXTFIELD_,
                label: biz_vnc_crm_admin.HDR_email + ":",
                labelLocation: _LEFT_,
                width: 250
            }, {
                type: _SPACER_,
                height: "5"
            }, {
                ref: ZaCRMadmin.A_companyStatus,
                type: _ZA_CHECKBOX_,
                label: biz_vnc_crm_admin.HDR_status,
                trueValue: true,
                falseValue: false,
                visibilityChecks: [],
                enableDisableChecks: []
            }]
        }]
    };
    return xFormObject;
}
