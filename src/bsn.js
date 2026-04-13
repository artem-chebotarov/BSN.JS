/**
 * © Vikargia 2026 Artem Chebotarov
 * Plugin: BSN (Bootstrap service notification)
 * Version: 1.0
 * Date: 08.04.2026
 * Licensed: Apache 2.0
 * Author: Artem Chebotarov
 * Email: vikargia@gmail.com
 * Github: https://github.com/vikargia/bsn
 */


// html templates
const toastHtml = `
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1060;">
    <div id="notification-toast" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                <strong id="notification-toast-title" class="d-block"></strong>
                <span id="notification-toast-body"></span>
            </div>
            <button id="notification-toast-close" type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label=""></button>
        </div>
    </div>
</div>`;

const promptHtml = `
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 350px;">
        <div class="modal-content bg-dark border-success shadow-lg text-success">
            <div class="modal-header border-success">
                <h1 id="notification-prompt-title" class="modal-title fs-5 m-0"></h1>
            </div>
            <div class="modal-body p-4">
                <p id="notification-prompt-body" class="mb-2 fs-6 text-center"></p>
                <input type="text" id="notification-prompt-input" 
                       class="form-control bg-dark text-success border-success shadow-none mt-3" 
                       autocomplete="off">
            </div>
            <div class="modal-footer border-success d-flex justify-content-between">
                <button id="notification-prompt-button-submit" class="btn btn-success w-45">Submit</button>
                <button id="notification-prompt-button-no" class="btn btn-outline-success w-45">Cancel</button>
            </div>
            <div class="p-2 text-center text-secondary" style="font-size: 0.8rem;">
                <span id="notification-prompt-app"></span>
            </div>
        </div>
    </div>
</div>`;



const confirmHtml = `
<div class="modal fade" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 350px;">
        <div class="modal-content bg-dark border-info shadow-lg text-info">
            <div class="modal-header border-info">
                <h1 id="notification-confirm-title" class="modal-title fs-5 m-0"></h1>
            </div>
            <div class="modal-body p-4 text-center">
                <p id="notification-confirm-body" class="mb-0 fs-6"></p>
            </div>
            <div class="modal-footer border-info d-flex justify-content-between">
                            <button id="notification-confirm-button-yes" class="btn btn-info w-45">Да</button>
                <button id="notification-confirm-button-no" class="btn btn-outline-info w-45">Нет</button>
            </div>
            <div class="p-2 text-center text-secondary" style="font-size: 0.8rem;">
                <span id="notification-confirm-app"></span>
            </div>
        </div>
    </div>
</div>`;

const alertHtml = `
                <div id="alert" class="modal fade" tabindex="-1" role="dialog" aria-modal="true">
                    <div class="modal-dialog modal-dialog-centered" style="width: 350px;">
                        <div class="modal-content bg-dark border-warning shadow-lg text-warning">
                            
                            <div class="modal-header border-warning">
                                <h1 id="notification-alert-title" class="modal-title fs-5 m-0"></h1>
                            </div>
                            
                            <div  class="modal-body p-4 text-center">
                                <p id="notification-alert-body" class="mb-0 fs-6"></p>
                            </div>
                            
                            <div class="modal-footer border-warning flex-column align-items-stretch">
                                <button id="notification-alert-button-ok" class="btn btn-warning w-100 mb-2">OK</button>
                                <div id="notification-alert-app" class="text-center text-secondary" style="font-size: 0.8rem;">
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `;


/**
 * BSN class
 */
class BSN {
    constructor() {
        // Data object
        this.data = {
            alert: {
                element: null,
                title: null,
                body: null,
                button: null,
                bootstrap: null,
                app: null
            },
            confirm: {
                element: null,
                title: null,
                body: null,
                btn_yes: null,
                btn_no: null,
                bootstrap: null,
                app: null
            },
            prompt: {
                element: null,
                title: null,
                body: null,
                input: null,
                button_submit: null,
                button_no: null,
                app: null,
                bootstrap: null,
                focus: false
            },
            toast: {
                container: null,
                element: null,
                title: null,
                body: null,
                bootstrap: null,
                close: null
            }
        }
    }
    /**
 * Method that initializes all dialog elements.
 * Its purpose is to create all DOM nodes.
 * Also prevents duplicating elements.
 * Attention! This method is used only inside this plugin and should not be used externally.
 */
    init(index, data, element) {
        if (this.data[data.type][element]) return;
        let wrapper = document.createElement("div");
        wrapper.innerHTML = data.html;
        this.data[data.type][index] = wrapper.querySelector(data[index]);
        this.data[data.type].title = this.data[data.type][index].querySelector("#notification-" + data.type + "-title");
        this.data[data.type].body = this.data[data.type][index].querySelector("#notification-" + data.type + "-body");

        for (let key of Object.keys(data)) {
            if (["type", "html", index].includes(key)) continue;
            this.data[data.type][key] = this.data[data.type][index].querySelector(data[key]);
        }
        document.body.appendChild(this.data[data.type][element]);
        if (["prompt", "confirm", "alert"].includes(data.type)) {
            this.data[data.type].bootstrap = new bootstrap.Modal(this.data[data.type][element], {
                keyboard: false,
                backdrop: 'static'
            });
            if (data.type == "prompt") {
                this.data.prompt.element.addEventListener("shown.bs.modal", (e) => {
                    if (this.data.prompt.input) {
                        if (this.data.prompt.focus) {
                        this.data.prompt.input.focus();
                        }
                    }
                }, "global"); // global or local. from Gianna.js (gianna framework)
            }
        } else {
            this.data.toast.bootstrap = new bootstrap.Toast(this.data.toast.element, { delay: 5000 });
        }
    }
    /**
 * Method creates and shows a toast
 * @param {object} obj - {title: "",message: "",delay: 5000}
 */
    toast(obj) {
        this.init("container", {
            type: "toast",
            container: ".toast-container",
            element: ".toast",
            title: "#notification-toast-title",
            body: "#notification-toast-body",
            close: "#notification-toast-close",
            html: toastHtml
        }, "element");

        let t = this.data.toast;
        t.close.setAttribute("aria-label",obj.ok_text || "Close");
    
        t.title.textContent = obj.title || "Toast title";
        t.body.textContent = obj.message || "Toast message";
        t.element.className = t.element.className.replace(/\btext-bg-\S+/g, "");
        t.element.classList.add(`text-bg-${obj.type || 'primary'}`);
        if (obj.delay) {
            t.bootstrap.dispose();
            t.bootstrap = new bootstrap.Toast(this.data.toast.element, { delay: obj.delay || 5000 });
        }
if (typeof obj.ok==="function") {
t.close.onclick = null;
t.close.onclick = (e) => {
    obj.ok();
}    
}
        t.bootstrap.show();
    }
    /**
     * Method requests user input
     * @param {object} obj - {title,message,ok,no,ok_text,no_text,app}
     */
    prompt(obj) {
        this.init("element", {
            html: promptHtml,
            type: "prompt",
            element: ".modal",
            input: "#notification-prompt-input",
            app: "#notification-prompt-app",
            button_submit: "#notification-prompt-button-submit",
            button_no: "#notification-prompt-button-no"
        }, "element");
        let p = this.data.prompt;
        p.title.textContent = obj.title || "Prompt title";
        p.body.textContent = obj.message || "Enter data";
        p.input.title = obj.input || "";
        p.input.value = obj.value || "";
        p.button_submit.textContent = obj.ok_text || "Submit";
        p.button_no.textContent = obj.no_text || "Cancel";
        p.app.textContent = obj.app || "";
p.focus = obj.focus || false;
        p.bootstrap.show();
        return new Promise((result) => {

            p.button_submit.onclick = null;
            p.button_submit.onclick = () => {
                let value = p.input.value;
                p.bootstrap.hide();
                p.input.value = "";
                result(value);
            }
            p.button_no.onclick = null;
            p.button_no.onclick = () => {
                p.bootstrap.hide();
                p.input.value = "";
                result(undefined);
            }
        });
    }

    /**
* Method requests confirmation from the user
* @param {object} obj - {title,message,ok,no,ok_text,no_text,app}
*/
    confirm(obj) {

        this.init("element", {
            type: "confirm",
            html: confirmHtml,
            element: ".modal",
            btn_yes: "#notification-confirm-button-yes",
            btn_no: "#notification-confirm-button-no",
            app: "#notification-confirm-app"
        }, "element");
        let c = this.data.confirm;
        c.title.textContent = obj.title || "Confirm title";
        c.body.textContent = obj.message || "Confirm message";
        c.btn_yes.textContent = obj.ok_text || "Yes";
        c.btn_no.textContent = obj.no_text || "No";
        c.app.textContent = obj.app || "";
        c.bootstrap.show();
        return new Promise((res) => {
            c.btn_yes.onclick = null;
            c.btn_yes.onclick = async () => {
                if (typeof obj.ok === "function") {
                    await obj.ok();
                }
                c.bootstrap.hide();
                res(true);
            }
            c.btn_no.onclick = null;
            c.btn_no.onclick = async () => {
                if (typeof obj.no === "function") {
                    await obj.no();
                }
                c.bootstrap.hide();
                res(false);
            }
        });
    }

    /**
     * Alert method
     * @param {object} obj - {title,message,ok,ok_text}
     */
    alert(obj) {
        this.init("element", {
            type: "alert",
            html: alertHtml,
            element: ".modal",
            button: "#notification-alert-button-ok",
            app: "#notification-alert-app"
        }, "element");
        this.data.alert.title.textContent = obj.title || "Alert title";
        this.data.alert.body.textContent = obj.message || "Alert message";
        this.data.alert.app.textContent = obj.app || "";
        this.data.alert.button.textContent = obj.ok_text || "OK";
        return new Promise((res) => {
            let result = null;
            this.data.alert.button.onclick = async () => {
                if (typeof obj.ok === "function") {
                    result = await obj.ok();
                }
                this.data.alert.bootstrap.hide();
                res(result);
            }
            this.data.alert.bootstrap.show();
        });
    }

}
if (!window.$gn) {
    /**
* Assignment and initialization
*/
    window.$gn = {};
}
window.$gn.bsn = new BSN();

