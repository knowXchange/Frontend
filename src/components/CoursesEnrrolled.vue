<template>
    <div>
        <div>
        </div>
        <div style="margin: 0 auto; width: 80%">
            <DataTable :value="courses" :selection="courseSelection" dataKey="id" :paginator="true" :rows="10">
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column field="id" header="ID"></Column>
                <Column field="courseName" header="Curso"></Column>
                <Column field="durationHours" header="Duracion"></Column>
                <Column :exportable="false">
                    <template>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"/>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>   
</template>
<script>    
export default {
    name: 'CoursesEnrroled',
    data(){
        return{
            courseSelection: null,
            courses: [
                {id:0,courseName:"curso nuevo",durationHours:100},
                {id:1,courseName:"curso nuevo",durationHours:100},
                {id:2,courseName:"curso nuevo",durationHours:100}
            ]
        }
    }

}
</script>