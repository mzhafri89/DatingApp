using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // * Map from AppUser to MemberDto
            CreateMap<AppUser, MemberDto>()
                // * Map the PhotoUrl property of the MemberDto to the PhotoUrl property of the AppUser
                .ForMember(
                    memberDto => memberDto.PhotoUrl,
                    memberOptions =>
                        memberOptions.MapFrom(
                            appUser => appUser.Photos.FirstOrDefault(photo => photo.IsMain).Url
                        )
                )
                .ForMember(
                    memberDto => memberDto.Age,
                    memberOptions =>
                        memberOptions.MapFrom(appUser => appUser.DateOfBirth.CalculateAge())
                );
            CreateMap<Photo, PhotoDto>();
        }
    }
}
