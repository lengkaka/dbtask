<?php
/**
 * Helper_StaticCompile
 * js
 *
 *     作者: simon (simon@huoban.com)
 * 创建时间: 2013-12-11 17:20:53
 * 修改记录:
 *
 * $Id: staticCompile.php 296 2013-12-12 07:13:11Z wangjia $
 */
class Helper_StaticCompile {

    /**
     * compile_jsTemplate
     * 编译所有的tpl
     */
    public static function compile_jsTemplate() {

        $source_file_dir = '../www/template/marketReport/';
        $compile_file_dir = '../www/script/template/marketReport/';

        //获取也就是扫描文件夹内的文件及文件夹名存入数组 $filesnames
        $filesnames = scandir($source_file_dir);

        foreach ($filesnames as $name) {

            if ($name == '.' || $name == '..') {

            } else {
                $source_file_path = $source_file_dir . $name;
                $compile_file_path = $compile_file_dir . $name . '.js';

                self::_compile_jsTemplate($source_file_path, $compile_file_path);
            }
        }
    }

    /**
     * _compile_jsTemplate
     * 编译artTemplate模版文件内容为seajs的一个模块
     *
     * @param  string $tpl_id 模版ID（确定此模版的唯一标识，一般为此模版的绝对URL地址）
     * @param  string $tpl 原始模版文件数据
     */
    private static function _compile_jsTemplate($source_file_path, $compile_file_path) {

        if (!$source_file_path|| !$compile_file_path) {
            return '';
        }

        $tpl_id = md5($source_file_path);
        $source_file_content = file_get_contents($source_file_path);

        try {

            $tpl = $source_file_content;
            // 去除换行和空格，转义"和'
            $tpl = addslashes(implode('', array_map('trim', explode("\n", $tpl))));

            $tpl_compiled = "define(['view_helper'], function(ViewHelper) {\n";
            $tpl_compiled .= "    return ViewHelper.compile('$tpl');\n";
            $tpl_compiled .= '});';

        } catch (Exception $e) {

            // 写错PHP类名或常量名时，通过JS抛异常方式通知开发、测试人员
            $tpl_compiled = "define(function() {";
            $tpl_compiled .= "    throw new Error('" . $e->getMessage() . "');";
            $tpl_compiled .= '});';

        }

        file_put_contents($compile_file_path, $tpl_compiled);

        return true;
    }
}

Helper_StaticCompile::compile_jsTemplate();
