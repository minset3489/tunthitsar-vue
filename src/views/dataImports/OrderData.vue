<template>
<section class="pt-28">
    <div>
    <div class="text-center items-center">
        <h4 class="text-3xl font-bold text-green-500">Customer Enquiry</h4>
    </div>
    <div>
        <table class="table table-bordered table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Customer Name</th>
                <th class="bg-gray-100">Phone Number</th>
                <th>Capacity</th>
                <th class="bg-gray-100">Purpose</th>
                <th>Region</th>
                <th class="bg-gray-100">City</th>
                <th>Message</th>
                <th class="bg-gray-100">Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cusEnq in collectionStore.documents" :key="cusEnq.id">
                <td>{{ cusEnq.name }}</td>
                <td class="bg-gray-100">{{ cusEnq.number }}</td>
                <td>{{ cusEnq.capacity }}</td>
                <td class="bg-gray-100">{{ cusEnq.purpose }}</td>
                <td>{{ cusEnq.region }}</td>
                <td class="bg-gray-100">{{ cusEnq.city }}</td>
                <td>{{ cusEnq.message }}</td>
                <td class="bg-gray-100">{{ formatDate(cusEnq.createdAt) }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</section>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useCollectionStore } from '../../stores/collectionStore';

export default {
setup() {
    const collectionStore = useCollectionStore();
    const error = ref(null);
    const sortField = ref('createdAt');
    const sortDirection = ref('asc');

    const updateCollection = () => {
    collectionStore
        .getCollection('customerEnquiry', {
        field: sortField.value,
        direction: sortDirection.value,
        })
        .catch((err) => {
        error.value = 'Could not fetch the data. ' + err.message;
        });
    };

    // Fetch the collection when the component is mounted
    onMounted(updateCollection);

    // Watch for changes in the documents and reset the error
    watch(() => collectionStore.documents, () => {
    error.value = null;
    });

    // Function to format the timestamp to dd-mm-yy
    const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
    };

    return { collectionStore, formatDate };
},
};
</script>

<style lang="scss" scoped>
/* Add your custom styles here if needed */
.table {
width: 100%;
margin-bottom: 1rem;
color: #212529;
border-collapse: collapse;

}

.table th,
.table td {
padding: 0.75rem;
vertical-align: top;
border-top: 1px solid #dee2e6;
user-select:text;
}

.table thead th {
vertical-align: bottom;
border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
border-top: 2px solid #dee2e6;
}
</style>
