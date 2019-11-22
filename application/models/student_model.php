<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Student_model extends CI_Model {

    private $student = 'student';
	
    function get_student_list() {
        $query = $this->db->get($this->student);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    function get_student($id) {
        $query = $this->db->get_where($this->student, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }
	
    function add_student($student_name, $student_address) {
        $data = array('name' => $student_name, 'address' => $student_address);
        $this->db->insert($this->student, $data);
    }

    function update_student($student_id, $student_name, $student_address) {
        $data = array('name' => $student_name, 'address' => $student_address);
        $this->db->where('id', $student_id);
        $this->db->update($this->student, $data);
    }
	
    function delete_student($student_id) {
        $this->db->where('id', $student_id);
        $this->db->delete($this->student);
    }

}