<template>
<div class="loader"></div>  

</template>
<style scoped>  
        .loader {  
            border: 8px solid #f3f3f3; 
            border-top: 8px solid red;  
            border-radius: 50%;  
            width: 50px;  
            height: 50px;  
            animation: spin 3s linear infinite;  
        }  

        @keyframes spin {  
            0% { transform: rotate(0deg); }  
            100% { transform: rotate(360deg); }  
        }  
    </style>  