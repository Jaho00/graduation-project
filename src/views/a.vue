<template>
    <div>
        <!-- <body>
            <form action="/API2" method="POST" enctype="multipart/form-data">
                <input multiple type="file" name="a" />
                <input type="submit" value="提交" />
            </form>
        </body> -->

        <div class="fileItem">
            //上传文件的input，type设置为file
            <input type="file" ref="fileId" @change="getFile" />
            <input type="submit" value="提交" @click="importRow" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            //赋值input中file内容
            xlsxFile: "",
        };
    },
    methods: {
        getFile() {
            //获取file内容
            let files = this.$refs.fileId.files[0];
            this.xlsxFile = files;
        },
        //上传文件
        importRow() {
            console.log(1);
            let that = this;
            if (that.xlsxFile == "") {
                // that.$message.error("请先添加文件");
                return;
            }
            // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            //创建一个FormData对象，然后通过append() 方法向对象中添加键值对
            let formData = new window.FormData();
            formData.append("smfile", that.xlsxFile);
            // formData.append("format", "json");
            // that.importUrl 上传的接口url
            const instance_SMMS = axios.create({
                // baseURL: "/API2",
                // timeout: 5000,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "C0ivdV1Ok7Cnz21Fh8u4N15DEFdZpF6B",
                },
            });
            instance_SMMS
                .post("/API2/upload", formData.get("smfile"))
                .then(function (response) {
                    // that.$message.success("上传成功");
                })
                .catch(function (error) {
                    // that.$message.error(res.data.msg);
                });
        },
    },
};
</script>

<style lang="less" scoped></style>
