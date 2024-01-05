package com.tekup.backend.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.tekup.backend.dao.Admin;
import com.tekup.backend.dto.AdminDto;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(AdminDto dto, @MappingTarget Admin entity);
}
