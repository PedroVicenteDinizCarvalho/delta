<?php

defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	exit;
}

//required for REST API
require(APPPATH . '/libraries/REST_Controller.php');
//require APPPATH . 'libraries/Format.php';
//use Restserver\Libraries;

class StudentRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
		
        //$this->load->library('Format','format');
		
        $this->load->model('student_model', 'sm');
    }
	
	function students_get() {
        $students = $this->sm->get_student_list();

        if ($students) {
            $this->response($students, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function student_get() {
        if (!$this->get('id')) { //query parameter, example,students?id=1
            $this->response(NULL, 400);
        }

        $student = $this->sm->get_student($this->get('id'));

        if ($student) {
            $this->response($student, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_student_post() {
        $student_name = $this->post('name');
        $student_address = $this->post('address');

        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size']     = '100';
        $config['max_width'] = '1024';
        $config['max_height'] = '768';

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('selectedFile'))
        {
                $error = array('error' => $this->upload->display_errors());
        }
        else
        {
                $data = array('upload_data' => $this->upload->data());
        }
        
        $result = $this->sm->add_student($student_name, $student_address);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function update_student_put() {
        $student_id = $this->put('id');
        $student_name = $this->put('name');
        $student_address = $this->put('address');

        $result = $this->sm->update_student($student_id, $student_name, $student_address);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
	function delete_student_delete($student_id) { //path parameter, example, /delete/1

        $result = $this->sm->delete_student($student_id);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
	
}