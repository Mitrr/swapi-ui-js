$(function(){
    var includes = $('[data-include]');
    //document.querySelector("[data-include]").innerText;
    jQuery.each(includes, function(){
        var file = 'components/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});

import {theme} from './theme.js';

document.addEventListener('DOMContentLoaded',function () {
    let sColor = localStorage.getItem('secondaryColor');
    let themeType = localStorage.getItem('themeType');

    if (sColor!==null && themeType!==null){
        theme.secondaryColor = sColor;
        theme.themeType = themeType;
    }
    theme.coolUpdate();
});

$('.menu-btn').on('click',function () {
   $('.menu-wrapper').slideToggle('slow');
});

let editPopup = document.querySelector('.edit-popup');
let editPopupSwitcher = false;

$('#edit').on('click',function () {
    this.classList.remove('pulse');
    editPopupSwitcher = !editPopupSwitcher;

    if (editPopupSwitcher){
        TweenMax.to(editPopup,1,{x:'2%',display:'block',width:'60%',height:'65vh',ease:Back.easeOut});
    } else {
        TweenMax.to(editPopup,1,{x:'-200%',display:'block',width:'60%',height:'0vh',ease:Power3.easeOut});
    }
});

$('.content-wrapper').on('click',function () {
    if (editPopupSwitcher){
        TweenMax.to(editPopup,1,{x:'-200%',display:'block',width:'60%',height:'0vh',ease:Power3.easeOut});
    }
});

let preview = $('.preview-wrapper');
let themeSelects = document.querySelectorAll('.theme-select');

let prewiewChild = function(){
    let nodes = [];

    let progressLine = $('.progress-line');

    nodes.push(progressLine[progressLine.length-1]);
    nodes.push($('.preview-wrapper>a')[0]);
    return nodes;
};

let themePreview = {
    themeType:'indigo-theme',
    secondaryColor:'#4ebdd4',
};

$('.theme-select').on('click',function () {
    for (let el of  themeSelects){
        el.classList.remove('selected-theme');
    }
    this.classList.add('selected-theme');

    if (this.id === 'indigo'){
        preview[0].classList.value = 'preview-wrapper indigo-theme';
        themePreview.themeType = 'indigo-theme';
    } else {
        preview[0].classList.value = 'preview-wrapper black-theme';
        themePreview.themeType = 'black-theme';
    }
});

$('.radio-item>label>span').on('click',function () {
    prewiewChild().forEach(el => el.style.backgroundColor = this.style.color);
    themePreview.secondaryColor = this.style.color;
});

$('#save-theme-btn').on('click',function () {
   // theme.themeType = themePreview.themeType;
   // theme.secondaryColor = themePreview.secondaryColor;
    localStorage.secondaryColor = themePreview.secondaryColor;
    localStorage.themeType = themePreview.themeType;
    theme.coolUpdate();
});
