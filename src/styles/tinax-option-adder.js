// Tinax Option Adder elementinin stili oluşturuluyor.

export const sheet = new CSSStyleSheet();
sheet.replaceSync (`
  :host {
    display: block;
  }
    

  select {
    width: 100% !important;
    word-wrap: normal;
  }


  select > option {
    border-bottom: 1px solid #c9c9c9a6;
    padding: 10px;
  }

  .controls {
    display:flex !important;
    border-color: gray;
    border-width: 0.1px;
    border-left-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
  }

  .form-select {
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    overflow-y: auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border: 0.1px solid gray;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    scrollbar-width: thin;
  }

  .form-select:focus {
    border-color: none;
    outline: 0;
    box-shadow:none;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .form-control:focus {
    border-color: none;
    outline: 0;
    box-shadow: none;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .btn-save {
    background-color: #dcfce7  !important;
    color: #16a34a !important;
    border-left-style: solid;
    border-width: 0 0.1px 0 0.1px;
    border-color: gray;
  }

  .btn-remove{
    background-color: #fee2e2 !important;
    color: #dc2626 !important;
  }

  .help-text {
    font-size: small;
    margin-top: 5px;
    color:#858585;
    font-family: Arial, Helvetica, sans-serif;
  }

  .error-message {
    color:#dc3545;
  }
  
  .input-group {
    display: flex;
    width: 100%;
  }

`);