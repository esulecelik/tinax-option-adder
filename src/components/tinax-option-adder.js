import { sheet } from '../styles/tinax-option-adder.js';

export class TinaxOptionAdder extends HTMLElement {
    constructor() {
        super();
        //  Element diğer html elemanlarından izole ediliyor.
        this.attachShadow({mode:'open'});
        
        // CSS dosyası ekleniyor.
        this.shadowRoot.adoptedStyleSheets =[sheet];
        this._count = 0;
        this.MAC_ADDRESS_FORMAT = /^([a-z0-9]{2}-){5}[a-z0-9]{2}$/i;
        this._selectedItems = [];

        // Formdan veri gonderilmişse ekleniyor.
        document.addEventListener('DOMContentLoaded', () => {
            this._addFormDataToList();
        });
    }


    static get observedAttributes() {
        return ['label','placeholder','button-text','name']
    }

    // HTMLElement's life cycle functions
    connectedCallback() {
        this.render();
        this._setupEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    


    // Dışarıdan kullanılabilir metodlar
    getSheet() {
        return[this.shadowRoot.adoptedStyleSheets]
    }
    getItems() {
        // kopyasını dönüyor.
        return [...this._selectedItems];
    }

    addItem(value) {
        if (!this._selectedItems.includes(value)) {
            this._selectedItems.push(value);
            this._addOption(value);
        }
    }

    removeItem(value) {
        this._selectedItems = this._selectedItems.filter(item => item !== value);
        const option = this.shadowRoot.querySelector(`option[value="${value}"]`);
        option?.remove();
    }

    clear() {
        this._selectedItems = [];
        this._select.innerHTML = '';
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const buttonText = this.getAttribute('button-text') || 'Ekle';
        const name = this.getAttribute('name') || 'tinax-option-adder'; 

        // HTML elemanının yapsı tanımlanıyor.
        this.shadowRoot.innerHTML = `
        <div>
            <select class="form-select" id="${name}" name="${name}" multiple>
                ${this._selectedItems.map(item => 
                `<option value="${item}">${item}</option>`
                ).join('')}
            </select>
            <div class="controls">
                <div class="input-group">
                    <input 
                        class="form-control"
                        id="newOption"
                        type="text" 
                        placeholder="${placeholder}"                    
                        autocomplete="off"
                        maxlength="17"
                    />
                    <button class="btn btn-save" id="add" type="button">${buttonText}</button>
                </div>
                <button id="remove" class="btn btn-remove" type="button">Sil</button>
            </div>

            <div class="error-message"></div>

            <div class="help-text">
            Seçmek için CTRL/CMD tuşu ile tıklayın
            </div>
        </div>
        `;

    }

    _setupEventListeners() {
        this._select = this.shadowRoot.querySelector('select');
        this._input = this.shadowRoot.querySelector('input');
        this._addButton = this.shadowRoot.querySelector('#add');
        this._removeButton = this.shadowRoot.querySelector('#remove');
        

        // HTMLElementine işlevleri atanıyor.
        this._addButton.addEventListener('click', this._handleAdd.bind(this));
        this._removeButton.addEventListener('click', this._handleRemove.bind(this));
        this._input.addEventListener('keypress', this._handleKeyPress.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._select.addEventListener('change', this._handleSelectChange.bind(this));
    }

    _removeEventListeners() {
        this._addButton?.removeEventListener('click', this._handleAdd);
        this._removeButton?.removeEventListener('click', this._handleRemove);
        this._input?.removeEventListener('keypress', this._handleKeyPress);
        this._input?.removeEventListener('input', this._handleInput);
        this._select?.removeEventListener('change', this._handleSelectChange);
    }

    
    _handleAdd() {
        const value = this._input.value.trim();
        
        if (!value) {
          this._showError('Lütfen bir değer girin');
          return;
        }

        // MAC formatı eşleşmiyorsa ekleme
        if (!this.MAC_ADDRESS_FORMAT.test(value)) {
          this._showError('Lütfen geçerli MAC adresi girin');
          return;
        }

        // Aynı değer varsa ekleme
        if (this._selectedItems.includes(value)) {
          this._showError('Bu değer zaten listede');
          return;
        }

        // Listeye ekle
        this._selectedItems.push(value);
        this._addOption(value);
        this._input.value = '';
        this._count= 0;
        this._input.focus();

        // Custom event dispatch
        this.dispatchEvent(new CustomEvent('item-added', {
          bubbles: true,
          composed: true,
          detail: { value, items: this._selectedItems }
        }));
    }

    _addOption(value) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        this._select.appendChild(option);
    }

    _showError(message) {
        const errorDiv = this.shadowRoot.querySelector('.error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
          errorDiv.style.display = 'none';
        }, 3000);
    }


    _handleRemove() {
        const selectedOptions = Array.from(this._select.selectedOptions);
        
        if (selectedOptions.length === 0) {
          this._showError('Lütfen silmek için öğe seçin');
          return;
        }

        selectedOptions.forEach(option => {
        const value = option.value;
        this._selectedItems = this._selectedItems.filter(item => item !== value);
            option.remove();
        });

        // Custom event dispatch
        this.dispatchEvent(new CustomEvent('item-removed', {
            bubbles: true,
            composed: true,
            detail: { items: this._selectedItems }
        }));
    }

    _handleInput(e) {
        // Backspace ve delete tuşunun işlevini koruması sağlanıyor.
  
        if( e.data ) {
            let value = e.target.value;
            let formatted ="";

            if(value.length > 0) {
                let positionOfShortLine = value.slice(-3).indexOf('-')
                //console.log(`Tire Konum : ${positionOfShortLine}`);
                //console.log(`Value.lenght : ${value.length}`);

                if( ( value.length != 17 ) && (positionOfShortLine == 0) || (positionOfShortLine == -1 && value.length == 2)){
                    // :AE
                    formatted = e.target.value + '-';
                    e.target.value = formatted;
                } else if ( positionOfShortLine == -1 && value.length > 2  ) {
                    // :AEF| <-- input after backspace
                    let lastInput = e.target.value.slice(-1);
                    let temp =  e.target.value.slice(0, -1);
                    
                    formatted = temp + '-' + lastInput;
                    e.target.value = formatted;
                }
               
              
            }
        }
    }


    _handleKeyPress(e) {
     
        if (e.key ==="Enter") {
            e.preventDefault();
            this._handleAdd();
        }
       
    }

    _handleSelectChange() {
        this.dispatchEvent(new CustomEvent('selection-change', {
            bubbles: true,
            composed: true,
            detail: { 
                selected: Array.from(this._select.selectedOptions).map(o => o.value)
            }
        }));
        
    }

    _addFormDataToList() {
        let tinaxSelectElement = document.querySelector("tinax-multi-select");
        let macs = tinaxSelectElement.getAttribute('value');
        let macList = macs.split('\n').map(x => x.trim()).filter(x => x);

        macList.forEach(mac => {
            this.addItem(mac);
        });
       

    }

}
