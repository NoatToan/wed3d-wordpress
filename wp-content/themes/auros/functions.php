<?php
if (version_compare($GLOBALS['wp_version'], '4.7-alpha', '<')) {
    require 'inc/back-compat.php';
    return;
}
if (is_admin()) {
    require get_theme_file_path('inc/admin/class-admin.php');
}

require get_theme_file_path('inc/tgm-plugins.php');
require get_theme_file_path('inc/template-tags.php');
require get_theme_file_path('inc/template-functions.php');
require get_theme_file_path('inc/class-main.php');
require get_theme_file_path('inc/starter-settings.php');

if (!class_exists('AurosCore')) {
    if (auros_is_woocommerce_activated()) {
        require get_theme_file_path('inc/vendors/woocommerce/woocommerce-template-functions.php');
        require get_theme_file_path('inc/vendors/woocommerce/class-woocommerce.php');
        require get_theme_file_path('inc/vendors/woocommerce/woocommerce-template-hooks.php');
    }
    // Blog Sidebar
    require get_theme_file_path('inc/class-sidebar.php');
}

add_action('acf/save_post', 'my_acf_save_post');
function my_acf_save_post($post_id)
{

    // Get newly saved values.
    $values = get_fields($post_id);

    // Check the new value of a specific field.
    $product_3d_model = get_field('product_3d_model', $post_id);
    if ($product_3d_model) {
        $value = get_field("product_3d_model", $post_id);
        echo '<pre>';
        var_dump($value['url']);
        var_dump($value);
        $my_file_dir = get_home_path() . str_replace(get_site_url(), '', $value['url']);
        $zip = new ZipArchive;
        $res = $zip->open($my_file_dir);
        if ($res === TRUE) {
            $test = $zip->extractTo(get_home_path() . '/public/uploads/unzip_3ds_file/' . $value['ID'] . '/' . $value['name']);
            $zip->close();
        } else {
        }
    }
    exit;
}

// add the action
add_action('woocommerce_update_product', 'action_woocommerce_update_product', 10, 1);


function upload_3ds($mime_types){
    $mime_types['3ds'] = 'application/x-3ds';
//    $mime_types['glb'] = 'model/gltf-binary';
    $mime_types['gltf'] = 'model/gltf-binary';
    return $mime_types;
}
add_filter('upload_mimes', 'upload_3ds', 1, 1);

/* Adds scripts */
add_action( 'wp_enqueue_scripts', 'add_scripts' );
function add_scripts() {
    wp_enqueue_script( 'three', get_theme_file_uri( 'assets/js/three.js' ), array(), '20201005', true );
    wp_enqueue_script( 'GLTFLoader', get_theme_file_uri( 'assets/js/GLTFLoader.js' ), array(), '20201005', true );
    wp_enqueue_script('TDSLoader', get_theme_file_uri('assets/js/TDSLoader.js'), array(), '20201005', true);
    wp_enqueue_script( 'gsap', get_theme_file_uri( 'assets/js/gsap.min.js' ), array(), '20201005', true );
    wp_enqueue_script( 'OrbitControls', get_theme_file_uri( 'assets/js/OrbitControls.js' ), array(), '20201005', true );
    wp_enqueue_script( 'mythree', get_theme_file_uri( 'assets/js/mythree.js' ), array(), '20201005', true );
}
