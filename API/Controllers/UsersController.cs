using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // * Only allow authorized users to access this controller
    [Authorize]
    // * Extends BaseApiController
    public class UsersController : BaseApiController
    {
        private IUserRepository _userRepository;

        private IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // * Get users from the repository
            var users = await _userRepository.GetUsersAsync();

            // * Map the users to the MemberDto and return
            var usersDto = _mapper.Map<IEnumerable<MemberDto>>(users);

            // * return the users
            return Ok(usersDto);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            // * Get user from the repository
            var user = await _userRepository.GetUserByUsernameAsync(username);

            // * Map the user to the MemberDto
            var userToReturn = _mapper.Map<MemberDto>(user);

            // * Return the user
            return Ok(userToReturn);
        }
    }
}
