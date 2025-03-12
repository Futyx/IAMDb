<template>
<div class="loader"></div>  

</template>
<style scoped>  
        .loader {  
            border: 6px dotted #ffffff85; 
            border-top: 6px dotted #ffffff85 ;  
            border-radius: 50%;  
            width: 50px;  
            height: 50px;  
            animation: spin 3s linear infinite;  
            margin:40px auto;
        }  

        @keyframes spin {  
            0% { transform: rotate(0deg); }  
            100% { transform: rotate(260deg); }  
        }  
    </style>  