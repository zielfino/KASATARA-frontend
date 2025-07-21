<script>
    import "$lib/app.css";

    import { contentWidth } from '$lib/stores/contentWidth';
    let width = 500;
    contentWidth.subscribe(val => width = val);
</script>

<section class="w-full bg-blue-500" style={`max-width: ${width}px;`}>
    <img src="https://i.imgur.com/kv4R0Nn.jpeg" alt="" class="w-full">
    <img src="https://i.imgur.com/fmCUxKc.jpeg" alt="" class="w-full">
    <img src="https://i.imgur.com/TlK1Hbw.jpeg" alt="" class="w-full">
    <img src="https://i.imgur.com/WC2nnWy.jpeg" alt="" class="w-full">
</section>