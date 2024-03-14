<script setup>

</script>

<template>
  <div class="table w-4/6 ">
    <div class="table-header-group border-2 border-slate-100">
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">MILL</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">ROTOR</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-500">ACTION</div>
      </div>
    </div>
    <div class="table-row-group">
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-rose-700 py-2 rounded-md min-w-24">STOP</button></div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-green-600 py-2 rounded-md min-w-24">START</button></div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-rose-700 py-2 rounded-md min-w-24">STOP</button></div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-green-600 py-2 rounded-md min-w-24">START</button></div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R1</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-rose-700 py-2 rounded-md min-w-24">STOP</button></div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">M2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">R2</div>
        <div class="table-cell text-left p-4 border-b-2 border-b-slate-700">
          <div class="flex flex-row"><button class="bg-green-600 py-2 rounded-md min-w-24">START</button></div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row p-10 justify-center items-center w-5/6">
    <span class="px-3 mx-2 bg-green-600">1</span>
    <span class="px-3 mx-2 bg-green-600">2</span>
    <span class="px-3 mx-2 bg-green-600">3</span>
    <span class="px-3 mx-2 bg-green-600">4</span>
  </div>
</template>

<style scoped>
  .table-row:hover {
    background-color: rgba(51, 65, 85, 0.237);
  }
</style>
