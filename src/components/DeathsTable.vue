<template>
<div class="container">
    <div class="row">
        <table class="table striped responsive-table">
            <thead>
                <tr v-if="headers">
                    <th v-for="header in headers" v-bind:key="header">{{header}}</th>
                </tr>
            </thead>
            <tbody v-if="deaths">
                <tr v-for="death in deaths" v-bind:key="death.person">
                    <td v-for="header in headers" v-bind:key="header">{{death[header]}}</td>
                </tr>
            </tbody>
        </table>
        <p v-for="page in pages" :key="page"><span>{{page}}</span></p>
    </div>
</div>
</template>

<script>
    export default {
        name: "DeathsTable",
        props: {
            headers: Array,
            deaths: Array,
        },
        data: function () {
            return {
                pages: Array(5).keys(),
            }
        }
    }
</script>

<style scoped>

</style>
